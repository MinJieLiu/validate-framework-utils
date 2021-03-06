'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 通过 field 验证
 * @param  {Object} field 验证信息域
 * @return {Function} 可通过 value 验证：包含结果、错误信息
 */


exports.default = function (field) {
  var _this = this;

  // Variables
  var id = field.id,
      name = field.name;

  var rules = field.rules.split(/\s*\|\s*/g);
  var isRequired = rules.some(function (rule) {
    return rule === 'required';
  });

  return function (value) {
    // 成功标识
    var result = true;
    // 包含 Promise 的返回值
    var promisedResultMap = void 0;
    // 错误信息域
    var error = {
      id: id,
      name: name,
      value: value
    };

    field.value = value; // eslint-disable-line no-param-reassign

    var _loop = function _loop(index, ruleLength) {
      var rule = rules[index];
      // 标识不通过，则不继续验证该规则
      if (!result) {
        return 'break';
      }

      // 转换：maxLength(12) => ['maxLength', 12]
      var parts = /^(.+?)\((.+)\)$/.exec(rule);
      var method = rule;
      var param = void 0;

      var getErrorMessage = function getErrorMessage() {
        var seqText = field.messages ? field.messages.split(/\s*\|\s*/g)[index] : '';
        return {
          rule: method,
          message: seqText // 替换 {{value}} 和 {{param}} 中参数
          ? seqText.replace(/{{\s*value\s*}}/g, value).replace(/{{\s*param\s*}}/g, param) : seqText
        };
      };

      // 解析带参数的验证如 maxLength(12)
      if (parts) {
        method = parts[1];
        param = parts[2];
      }

      // 整体规则中没有 required，并且该值为空，并且不以 required 开头，则不验证
      var jumpRule = !isRequired && (0, _util.isEmpty)(value) && method.indexOf('required') !== 0;

      // 当前方法
      var currentMethod = _this[method];
      // 匹配验证
      if (typeof currentMethod === 'function' && !jumpRule) {
        // Validate
        var currentResult = currentMethod.apply(_this, [field, param]);

        if ((0, _util.isPromise)(currentResult)) {
          promisedResultMap = currentResult.then(function (resolvedResult) {
            return {
              result: resolvedResult,
              error: _extends({}, error, !resolvedResult && getErrorMessage())
            };
          });
        }

        if (!currentResult) {
          result = false;
        }
      }

      // 验证不通过，则解析错误信息
      if (!result) {
        Object.assign(error, getErrorMessage());
      }
    };

    for (var index = 0, ruleLength = rules.length; index < ruleLength; index += 1) {
      var _ret = _loop(index, ruleLength);

      if (_ret === 'break') break;
    }

    if (promisedResultMap) {
      return promisedResultMap;
    }

    return {
      result: result,
      error: error
    };
  };
};

var _util = require('./util');
//# sourceMappingURL=core.js.map