# validate-framework-utils

Some utils are used for validation

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

> global.js

import validator from 'validate-framework-utils/global';

// ...

const { result, error } = validator.validateByField(field);

// ...

```
