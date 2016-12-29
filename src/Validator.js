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
   * @param name
   * @param method
   * @return {Validator}
   */
  addMethod(name, method) {
    if (typeof method === 'function') {
      this[name] = method;
    }
    return this;
  }

  /**
   * 移除验证方法
   * @param name
   * @return {Validator}
   */
  removeMethod(name) {
    delete this[name];
    return this;
  }

  /**
   * 通过 field 验证
   * @param  {Object} field 验证信息域
   * @return {Object} 包含结果、错误信息
   */
  validateByField(field) {
    return validateByField.call(this, field);
  }
}
