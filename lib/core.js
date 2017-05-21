'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 通过 field 验证
 * @param  {Object} field 验证信息域
 * @return {Object} 包含结果、错误信息
 */
exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(field) {
    var _this = this;

    var result, error, rules, isRequired, isEmpty, _loop, index, ruleLength, _ret;

    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // 成功标识
            result = true;
            // 错误信息域

            error = {
              id: field.id,
              name: field.name,
              value: field.value
            };
            rules = field.rules.split(/\s*\|\s*/g);
            isRequired = rules.some(function (rule) {
              return rule === 'required';
            });
            isEmpty = field.value === undefined || field.value === null || field.value === '';
            _loop = regeneratorRuntime.mark(function _loop(index, ruleLength) {
              var rule, parts, method, param, jumpRule;
              return regeneratorRuntime.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      rule = rules[index];
                      // 标识不通过，则不继续验证该规则

                      if (result) {
                        _context.next = 3;
                        break;
                      }

                      return _context.abrupt('return', 'break');

                    case 3:

                      // 转换：maxLength(12) => ['maxLength', 12]
                      parts = /^(.+?)\((.+)\)$/.exec(rule);
                      method = rule;
                      param = '';

                      // 解析带参数的验证如 maxLength(12)

                      if (parts) {
                        method = parts[1];
                        param = parts[2];
                      }

                      // 整体规则中没有 required，并且该值为空，并且不以 required 开头，则不验证
                      jumpRule = !isRequired && isEmpty && method.indexOf('required') !== 0;

                      // 匹配验证

                      if (!(typeof _this[method] === 'function' && !jumpRule)) {
                        _context.next = 13;
                        break;
                      }

                      _context.next = 11;
                      return _this[method].apply(_this, [field, param]);

                    case 11:
                      if (_context.sent) {
                        _context.next = 13;
                        break;
                      }

                      result = false;

                    case 13:

                      // 验证不通过，解析错误信息
                      if (!result) {
                        Object.assign(error, {
                          rule: method,
                          message: function () {
                            var seqText = field.messages ? field.messages.split(/\s*\|\s*/g)[index] : '';
                            // 替换 {{value}} 和 {{param}} 中参数
                            return seqText ? seqText.replace(/{{\s*value\s*}}/g, field.value).replace(/{{\s*param\s*}}/g, param) : seqText;
                          }()
                        });
                      }

                    case 14:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _loop, _this);
            });
            index = 0, ruleLength = rules.length;

          case 7:
            if (!(index < ruleLength)) {
              _context2.next = 15;
              break;
            }

            return _context2.delegateYield(_loop(index, ruleLength), 't0', 9);

          case 9:
            _ret = _context2.t0;

            if (!(_ret === 'break')) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt('break', 15);

          case 12:
            index += 1;
            _context2.next = 7;
            break;

          case 15:
            return _context2.abrupt('return', {
              result: result,
              error: error
            });

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=core.js.map