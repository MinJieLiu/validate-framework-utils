import testHook from './testHook';
import validateByField from './core';

/**
 * 验证方法，不依赖对象实例
 */
const validator = {
  ...testHook,
  validateByField(field) {
    return validateByField.call(validator, field);
  },
};

export default validator;
