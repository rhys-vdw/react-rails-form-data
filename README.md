# React Rails form data

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> React component that serializes arbitrary JS objects into hidden fields for Ruby on Rails

## Background

Created by UsabilityHub as a helper to serialize JS objects into hidden form fields. The fields are named so that they are interpreted correctly by Rails. Can handle complex nested objects.

## Install

```console
npm install react-rails-form-data --save
```

## Usage

```js
import React from 'react'
import RailsFormData from 'react-rails-form-data'

export default class FormDataExample({ uri }) {
  const data = {
    name: 'Jane Smith',
    dateOfBirth: '1991-01-01',
    favoriteColors: ['red', 'magenta']
  }

  return (
    <form action={uri}>
      <RailsFormData path='person' data={data} />
      <button type='submit'>
        Post {data.name}'s data to {uri}.
      </button>
    </form>
  )
}
```

```html
<form action='http://example.com/people'>
  <div style='display: none;'>
    <input type='hidden' name='person[name]' value='Jane Smith' />
    <input type='hidden' name='person[dateOfBirth]' value='1992-01-01' />
    <input type='hidden' name='person[favoriteColors][]' value='red' />
    <input type='hidden' name='person[favoriteColors][]' value='magenta' />
  </div>
  <button type='submit'>
    Post Jane Smith's data to http://example.com/people.
  </button>
</form>
```

## API

### `RailsFormData`

Create a hidden div with as many hidden fields as required.

#### Props
- `path`: `string` - The key under which this object's properties will be grouped.
- `data`: `any` - The data to group.

## Contribute

Questions, bug reports and pull requests welcome. See [GitHub issues](https://github.com/usabilityhub/react-rails-form-data/issues).

## License

MIT
