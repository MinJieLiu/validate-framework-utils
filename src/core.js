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
    // 逐条验证，如果已经验证失败，则不需要进入当前条目再次验证
    if (!result) {
      return;
    }

    // 转换如：maxLength(12) => ['maxLength', 12]
    const parts = /^(.+?)\((.+)\)$/.exec(rule);
    let method = rule;
    let param = '';

    // 解析带参数的验证如 max_length(12)
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

    // 解析错误信息
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
