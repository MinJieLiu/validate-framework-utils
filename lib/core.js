'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * 通过 field 验证
                                                                                                                                                                                                                                                                   * @param  {Object} field 验证信息域
                                                                                                                                                                                                                                                                   * @return {Object} 包含结果、错误信息
                                                                                                                                                                                                                                                                   */


exports.default = function (field) {
  var _this = this;

  // 成功标识
  var result = true;
  // 错误信息域
  var error = {
    id: field.id,
    name: field.name,
    value: field.value
  };

  var rules = field.rules.split(/\s*\|\s*/g);

  var isRequired = rules.some(function (rule) {
    return rule === 'required';
  });
  var isEmpty = field.value === undefined || field.value === null || field.value === '';

  rules.forEach(function (rule, index) {
    // 标识不通过，则不继续验证该规则
    if (!result) {
      return;
    }

    // 转换：maxLength(12) => ['maxLength', 12]
    var parts = /^(.+?)\((.+)\)$/.exec(rule);
    var method = rule;
    var param = '';

    // 解析带参数的验证如 maxLength(12)
    if (parts) {
      method = parts[1];
      param = parts[2];
    }

    // 整体规则中没有 required，并且该值为空，并且不以 required 开头，则不验证
    var jumpRule = !isRequired && isEmpty && method.indexOf('required') !== 0;

    // 匹配验证
    if (typeof _this[method] === 'function' && !jumpRule) {
      if (!_this[method].apply(_this, [field, param])) {
        result = false;
      }
    }

    // 验证不通过，解析错误信息
    if (!result) {
      _extends(error, {
        rule: method,
        message: function () {
          var seqText = field.messages ? field.messages.split(/\s*\|\s*/g)[index] : '';
          // 替换 {{value}} 和 {{param}} 中参数
          return seqText ? seqText.replace(/\{\{\s*value\s*}}/g, field.value).replace(/\{\{\s*param\s*}}/g, param) : seqText;
        }()
      });
    }
  });

  return {
    result: result,
    error: error
  };
};
//# sourceMappingURL=core.js.map