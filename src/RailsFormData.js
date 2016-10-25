import React, { PropTypes } from 'react'
import flatMap from 'lodash.flatmap'
import isArray from 'lodash.isarray'
import isEmpty from 'lodash.isempty'
import isObject from 'lodash.isobject'
import isPlainObject from 'lodash.isplainobject'

function toFields (path, data) {
  if (data == null) {
    return false
  }

  if (isPlainObject(data)) {
    return flatMap(data, (value, key) => {
      const name = path ? `${path}[${key}]` : key
      return toFields(name, value)
    })
  }

  if (isEmpty(path)) {
    throw new TypeError(
      `Only keyed objects can be turned into form data, got: ${data}`
    )
  }

  if (isArray(data)) {
    // Objects and arrays are keyed explicitly, plain arrays are not.
    //
    // eg. we must do:
    //
    // array_name[0][x] = 5
    // array_name[0][y] = 6
    // array_name[1][x] = 4
    // array_name[1][y] = 7
    //
    // Because this is ambiguous:
    //
    // array_name[][x] = 5
    // array_name[][y] = 6
    // array_name[][x] = 4
    // array_name[][y] = 7
    //
    // The problem with this is that you end up with a hash on the rails end. As
    // far as I can tell, this is limitation of the Rails form naming convention.
    //
    if (isObject(data[0])) {
      return flatMap(data, (value, key) => toFields(`${path}[${key}]`, value))
    }

    // For simple value arrays it's okay to use the proper array syntax.
    const name = `${path}[]`
    return data.map((value, index) => value != null &&
      <input type='hidden' key={`${path}[${index}]`} name={name} value={value} />
    )
  }

  return (
    <input key={path} type='hidden' name={path} value={data} />
  )
}

export default function RailsFormData ({ path, data, ...props }) {
  return (
    <div style={{ display: 'none' }} {...props}>
      {toFields(path, data)}
    </div>
  )
}

RailsFormData.propTypes = {
  path: PropTypes.string,
  data: PropTypes.object.isRequired
}
