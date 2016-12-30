/**
 * 通过 field 验证
 * @param  {Object} field 验证信息域
 * @return {Object} 包含结果、错误信息
 */
export default function (field) {
  // 成功标识
  let result = true;
  let error = null;

  const isRequired = field.rules.includes('required');
  const isEmpty = field.value === undefined || field.value === null || field.value === '';

  const rules = field.rules.split(/\s*\|\s*/g);

  rules.forEach((rule, index) => {
    // 标识不通过，则不继续验证该规则
    if (!result) {
      return;
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

    // 如果该规则为 required，并且该值为空，则不验证
    const jumpRule = !isRequired && isEmpty;

    // 匹配验证
    if (typeof this[method] === 'function' && !jumpRule) {
      if (!this[method].apply(this, [field, param])) {
        result = false;
      }
    }

    // 错误信息域
    error = {
      id: field.id,
      name: field.name,
      value: field.value,
      rule: method,
    };

    // 验证不通过，解析错误信息
    if (!result) {
      // 错误提示
      error.message = (() => {
        const seqText = field.messages ? field.messages.split(/\s*\|\s*/g)[index] : '';
        // 替换 {{value}} 和 {{param}} 为指定值
        return seqText
          ? seqText.replace(/\{\{\s*value\s*}}/g, field.value).replace(/\{\{\s*param\s*}}/g, param)
          : seqText;
      })();
    }
  });

  return {
    result,
    error,
  };
}
