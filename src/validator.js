import testHook from './testHook';
import validateByField from './core';

/**
 * 验证核心方法，不依赖对象实例
 */
const validator = {
  ...testHook,
};

validator.validateByField = field => validateByField.call(validator, field);

export default validator;
