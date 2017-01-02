# validate-framework-utils

Some utils are used for validation

[![npm](https://img.shields.io/npm/v/validate-framework-utils.svg?style=flat-square)]()
[![Travis](https://img.shields.io/travis/MinJieLiu/validate-framework-utils.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/dt/validate-framework-utils.svg?style=flat-square)]()

## How to use?

    npm i validate-framework-utils --save

> Validator.js

```js
import Validator from 'validate-framework-utils';

const validator = new Validator();

const field = {
  rules: 'required',
  messages: 'Can not be empty!',
  value: '',
};

// `result` is the verification result
// `error` contains the error message

const { result, error } = validator.validateByField(field);

// ...

```

> global.js

```js
import validator from 'validate-framework-utils/global';

// ...

const { result, error } = validator.validateByField(field);

// ...

```
