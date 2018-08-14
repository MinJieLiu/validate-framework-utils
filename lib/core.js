'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (field) {
  var _this = this;

  // Variables
  var id = field.id,
      name = field.name;

  var rules = field.rules.split(/\s*\|\s*/g);
  var isRequired = rules.some(function (rule) {
    return rule === 'required';
  });

  return function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(value) {
      var result, error, index, ruleLength, rule, parts, method, param, jumpRule, currentMethod, seqText;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 成功标识
              result = true;
              // 错误信息域

              error = {
                id: id,
                name: name,
                value: value
              };


              field.value = value; // eslint-disable-line no-param-reassign

              index = 0, ruleLength = rules.length;

            case 4:
              if (!(index < ruleLength)) {
                _context.next = 23;
                break;
              }

              rule = rules[index];
              // 标识不通过，则不继续验证该规则

              if (result) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('break', 23);

            case 8:

              // 转换：maxLength(12) => ['maxLength', 12]
              parts = /^(.+?)\((.+)\)$/.exec(rule);
              method = rule;
              param = void 0;

              // 解析带参数的验证如 maxLength(12)

              if (parts) {
                method = parts[1];
                param = parts[2];
              }

              // 整体规则中没有 required，并且该值为空，并且不以 required 开头，则不验证
              jumpRule = !isRequired && (0, _util.isEmpty)(value) && method.indexOf('required') !== 0;

              // 当前方法

              currentMethod = _this[method];
              // 匹配验证

              if (!(typeof currentMethod === 'function' && !jumpRule)) {
                _context.next = 19;
                break;
              }

              _context.next = 17;
              return currentMethod.apply(_this, [field, param]);

            case 17:
              if (_context.sent) {
                _context.next = 19;
                break;
              }

              result = false;

            case 19:

              // 验证不通过，则解析错误信息
              if (!result) {
                // 当前验证不通过的规则
                error.rule = method;

                // 替换 {{value}} 和 {{param}} 中参数
                seqText = field.messages ? field.messages.split(/\s*\|\s*/g)[index] : '';

                error.message = seqText ? seqText.replace(/{{\s*value\s*}}/g, value).replace(/{{\s*param\s*}}/g, param) : seqText;
              }

            case 20:
              index += 1;
              _context.next = 4;
              break;

            case 23:
              return _context.abrupt('return', {
                result: result,
                error: error
              });

            case 24:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

var _util = require('./util');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 通过 field 验证
 * @param  {Object} field 验证信息域
 * @return {Function} 可通过 value 验证：包含结果、错误信息
 */
//# sourceMappingURL=core.js.map