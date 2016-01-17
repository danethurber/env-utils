# ENV Utils

[![Circle CI](https://circleci.com/gh/danethurber/env-utils.svg?style=shield)](https://circleci.com/gh/danethurber/env-utils)

Easily Get Environment Variables

## Install

```sh
$ npm install env-utils
```

## Methods

### getEnvVar

gets an environment variable

```js
import {getEnvVar} from 'env-utils'
const PORT = getEnvVar('PORT')
```

You can also set a fallback value

```js
const PORT = getEnvVar('PORT', '1234')
```

You can force the value to be a boolean

```js
const PORT = getEnvVar('PORT', null, { boolean: true })
```

And if your env variable is a comma separated string you can get back an array instead

```js
const PORT = getEnvVar('PORT', [], { commaSeparated: true })
```
