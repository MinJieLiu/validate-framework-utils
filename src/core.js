import { isEmpty } from './util';

/**
 * 通过 field 验证
 * @param  {Object} field 验证信息域
 * @return {Function} 可通过 value 验证：包含结果、错误信息
 */
export default function (field) {
  // Variables
  const { id, name } = field;
  const rules = field.rules.split(/\s*\|\s*/g);
  const isRequired = rules.some(rule => rule === 'required');

  return async (value) => {
    // 成功标识
    let result = true;
    // 是否执行过异步方法
    let executedAsyncFunction = false;
    // 错误信息域
    const error = {
      id,
      name,
      value,
    };
    // Assign value to field
    Object.assign(field, { value });

    for (let index = 0, ruleLength = rules.length; index < ruleLength; index += 1) {
      const rule = rules[index];
      // 标识不通过，则不继续验证该规则
      if (!result) {
        break;
      }

      // 转换：maxLength(12) => ['maxLength', 12]
      const parts = /^(.+?)\((.+)\)$/.exec(rule);
      let method = rule;
      let param;

      // 解析带参数的验证如 maxLength(12)
      if (parts) {
        method = parts[1];
        param = parts[2];
      }

      // 整体规则中没有 required，并且该值为空，并且不以 required 开头，则不验证
      const jumpRule = !isRequired && isEmpty(value) && method.indexOf('required') !== 0;

      // 当前方法
      const currentMethod = this[method];
      // 匹配验证
      if (typeof currentMethod === 'function' && !jumpRule) {
        // Validate
        const currentResult = currentMethod.apply(this, [field, param]);
        // 异步方法
        // babel 中无法使用该判断: Object.getPrototypeOf(currentMethod).constructor.name === 'AsyncFunction'
        if (typeof currentResult === 'object' && currentResult.then) {
          executedAsyncFunction = true;
          // eslint-disable-next-line no-await-in-loop
          result = await currentResult;
        } else {
          result = currentResult;
        }
      }

      // 验证不通过，则解析错误信息
      if (!result) {
        // 当前验证不通过的规则
        error.rule = method;

        // 替换 {{value}} 和 {{param}} 中参数
        const seqText = field.messages ? field.messages.split(/\s*\|\s*/g)[index] : '';
        error.message = seqText
          ? seqText.replace(/{{\s*value\s*}}/g, value).replace(/{{\s*param\s*}}/g, param)
          : seqText;
      }
    }

    return {
      result,
      error,
      executedAsyncFunction,
    };
  };
}
