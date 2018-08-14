# validate-framework-utils

Some utils are used for validation

[![npm](https://img.shields.io/npm/v/validate-framework-utils.svg?style=flat-square)](https://www.npmjs.com/package/validate-framework-utils)
[![Travis](https://img.shields.io/travis/MinJieLiu/validate-framework-utils.svg?style=flat-square)](https://travis-ci.org/MinJieLiu/validate-framework-utils)
[![npm](https://img.shields.io/npm/dt/validate-framework-utils.svg?style=flat-square)](https://github.com/MinJieLiu/validate-framework-utils)

## How to use?

    yarn add validate-framework-utils

```js
import Validator from 'validate-framework-utils';

const validator = new Validator();

const field = {
  rules: 'required | isEmail | maxLength(32)', // Asynchronous methods need to be put to the end
  messages: 'Can not be empty! | Please enter a valid email address. | Can not exceed {{param}} characters.',
};

const {
  result, // The verification result
  error, // contains the error message
} = await validator.validateByField(field)('example@example.com');

// ...
```

The field:

 * `rules` One or more rules (separated by | separated)
 * `messages` One or more messages (separated by | separated). {{Value}} is the value, and {{param}} is a parameter of like `maxLength(32)`
 * `value` The value to use for validation

### Customize the validation method

Required the validation method begins with `required`

```js
validator.addMethods({
  limitSelect(field, param) {
    return field.value.length <= param;
  },
  async validateFromServer(field, param) {
    return await doServerAPI();
  },
});
```

## API

 * addMethods(methods)
 * removeMethods(...names)
 * validateByField(field) `@return Promise`

## Built-in validation method

 * required
 * isAbc
 * isDate
 * isDecimal
 * isEmail
 * isInteger
 * isIp
 * isNumeric
 * isPhone
 * isTel
 * isUrl
 * maxLength(length)
 * minLength(length)
 * greaterThan(param)
 * lessThan(param)
 * greaterThanDate(date)
 * lessThanDate(date)
