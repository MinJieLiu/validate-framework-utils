'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _testHook = require('./testHook');

var _testHook2 = _interopRequireDefault(_testHook);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 验证方法，不依赖对象实例
 */
var validator = _extends({}, _testHook2.default, {
  validateByField: function validateByField(field) {
    return _core2.default.call(validator, field);
  }
});

exports.default = validator;
//# sourceMappingURL=global.js.map