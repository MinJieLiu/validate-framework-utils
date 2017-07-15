'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
      var result, executedAsyncFunction, error, index, ruleLength, rule, parts, method, param, jumpRule, currentMethod, currentResult, seqText;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 成功标识
              result = true;
              // 是否执行过异步方法

              executedAsyncFunction = false;
              // 错误信息域

              error = {
                id: id,
                name: name,
                value: value
              };
              // Assign value to field

              Object.assign(field, { value: value });

              index = 0, ruleLength = rules.length;

            case 5:
              if (!(index < ruleLength)) {
                _context.next = 29;
                break;
              }

              rule = rules[index];
              // 标识不通过，则不继续验证该规则

              if (result) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('break', 29);

            case 9:

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
                _context.next = 25;
                break;
              }

              // Validate
              currentResult = currentMethod.apply(_this, [field, param]);
              // 异步方法
              // babel 中无法使用该判断: Object.getPrototypeOf(currentMethod).constructor.name === 'AsyncFunction'

              if (!((typeof currentResult === 'undefined' ? 'undefined' : _typeof(currentResult)) === 'object' && currentResult.then)) {
                _context.next = 24;
                break;
              }

              executedAsyncFunction = true;
              // eslint-disable-next-line no-await-in-loop
              _context.next = 21;
              return currentResult;

            case 21:
              result = _context.sent;
              _context.next = 25;
              break;

            case 24:
              result = currentResult;

            case 25:

              // 验证不通过，则解析错误信息
              if (!result) {
                // 当前验证不通过的规则
                error.rule = method;

                // 替换 {{value}} 和 {{param}} 中参数
                seqText = field.messages ? field.messages.split(/\s*\|\s*/g)[index] : '';

                error.message = seqText ? seqText.replace(/{{\s*value\s*}}/g, value).replace(/{{\s*param\s*}}/g, param) : seqText;
              }

            case 26:
              index += 1;
              _context.next = 5;
              break;

            case 29:
              return _context.abrupt('return', {
                result: result,
                error: error,
                executedAsyncFunction: executedAsyncFunction
              });

            case 30:
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