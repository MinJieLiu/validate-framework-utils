import { isEmpty } from './util';

/**
 * 通过 field 验证
 * @param  {Object} field 验证信息域
 * @return {Object} 包含结果、错误信息
 */
export default async function (field) {
  const { id, name, value } = field;
  // 成功标识
  let result = true;
  // 错误信息域
  const error = {
    id,
    name,
    value,
  };

  const rules = field.rules.split(/\s*\|\s*/g);

  const isRequired = rules.some(rule => rule === 'required');

  for (let index = 0, ruleLength = rules.length; index < ruleLength; index += 1) {
    const rule = rules[index];
    // 标识不通过，则不继续验证该规则
    if (!result) {
      break;
    }

    // 转换：maxLength(12) => ['maxLength', 12]
    const parts = /^(.+?)\((.+)\)$/.exec(rule);
    let method = rule;
    let param = '';

    // 解析带参数的验证如 maxLength(12)
    if (parts) {
      method = parts[1];
      param = parts[2];
    }

    // 整体规则中没有 required，并且该值为空，并且不以 required 开头，则不验证
    const jumpRule = !isRequired && isEmpty(value) && method.indexOf('required') !== 0;

    // 匹配验证
    if (typeof this[method] === 'function' && !jumpRule) {
      // eslint-disable-next-line no-await-in-loop
      if (!await this[method].apply(this, [field, param])) {
        result = false;
      }
    }

    // 验证不通过，解析错误信息
    if (!result) {
      const seqText = field.messages ? field.messages.split(/\s*\|\s*/g)[index] : '';
      // 替换 {{value}} 和 {{param}} 中参数
      const message = seqText
        ? seqText.replace(/{{\s*value\s*}}/g, value).replace(/{{\s*param\s*}}/g, param)
        : seqText;
      // Assign
      Object.assign(error, {
        rule: method,
        message,
      });
    }
  }

  return {
    result,
    error,
  };
}
