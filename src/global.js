import testHook from './testHook';
import validateField from './core';

/**
 * 验证方法，不依赖对象实例
 */
const validator = {
  ...testHook,
  validateField(field) {
    return validateField.call(validator, field);
  },
};

export default validator;
