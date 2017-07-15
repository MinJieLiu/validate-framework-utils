'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _testHook = require('./testHook');

var _testHook2 = _interopRequireDefault(_testHook);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 验证组件
 */
var Validator = function () {
  function Validator() {
    _classCallCheck(this, Validator);

    // 绑定验证基本验证方法
    Object.assign(this, _extends({}, _testHook2.default));
  }

  /**
   * 添加验证方法
   * @param methods
   * @return {Validator}
   */


  _createClass(Validator, [{
    key: 'addMethods',
    value: function addMethods(methods) {
      Object.assign(this, methods);
      return this;
    }

    /**
     * 移除验证方法
     * @param names
     * @return {Validator}
     */

  }, {
    key: 'removeMethods',
    value: function removeMethods() {
      var _this = this;

      for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
        names[_key] = arguments[_key];
      }

      names.forEach(function (name) {
        return delete _this[name];
      });
      return this;
    }

    /**
     * 通过 field 验证
     * @param  {Object} field - 验证信息域
     * @return {Function} [Promise] - 包含结果、错误信息
     */

  }, {
    key: 'validateField',
    value: function validateField(field) {
      return _core2.default.call(this, field);
    }
  }]);

  return Validator;
}();

exports.default = Validator;
//# sourceMappingURL=Validator.js.map