import testHook from './testHook';
import validateByField from './core';

/**
 * 验证组件
 */
export default class Validator {

  constructor() {
    // 绑定验证基本验证方法
    Object.assign(this, {
      ...testHook,
    });
  }

  /**
   * 添加验证方法
   * @param methods
   * @return {Validator}
   */
  addMethods(methods) {
    Object.assign(this, methods);
    return this;
  }

  /**
   * 移除验证方法
   * @param names
   * @return {Validator}
   */
  removeMethods(...names) {
    names.forEach(name => delete this[name]);
    return this;
  }

  /**
   * 通过 field 验证
   * @param  {Object} field - 验证信息域
   * @return {Object} [Promise] - 包含结果、错误信息
   */
  validateByField(field) {
    return validateByField.call(this, field);
  }
}
