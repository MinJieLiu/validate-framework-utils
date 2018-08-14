import { isEmpty, isPromise } from './util';

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

  return (value) => {
    // 成功标识
    let result = true;
    // 包含 Promise 的返回值
    let promisedResultMap;
    // 错误信息域
    const error = {
      id,
      name,
      value,
    };

    field.value = value; // eslint-disable-line no-param-reassign

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

      const getErrorMessage = () => {
        const seqText = field.messages ? field.messages.split(/\s*\|\s*/g)[index] : '';
        return {
          rule: method,
          message: seqText // 替换 {{value}} 和 {{param}} 中参数
            ? seqText.replace(/{{\s*value\s*}}/g, value).replace(/{{\s*param\s*}}/g, param)
            : seqText,
        };
      };

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

        if (isPromise(currentResult)) {
          promisedResultMap = currentResult.then(resolvedResult => ({
            result: resolvedResult,
            error: {
              ...error,
              ...!resolvedResult && getErrorMessage(),
            },
          }));
        }

        if (!currentResult) {
          result = false;
        }
      }

      // 验证不通过，则解析错误信息
      if (!result) {
        Object.assign(error, getErrorMessage());
      }
    }

    if (promisedResultMap) {
      return promisedResultMap;
    }

    return {
      result,
      error,
    };
  };
}
