'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hookTest = undefined;

var _regex = require('./regex');

var _regex2 = _interopRequireDefault(_regex);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 验证
var hookTest = exports.hookTest = function hookTest(type, field) {
  return _regex2.default[type].test((0, _util.getValue)(field));
};

/**
 * 验证方法
 */
exports.default = {

  // 自然数
  isNumeric: function isNumeric(field) {
    return hookTest('numeric', field);
  },


  // 整数
  isInteger: function isInteger(field) {
    return hookTest('integer', field);
  },


  // 浮点数
  isDecimal: function isDecimal(field) {
    return hookTest('decimal', field);
  },


  // 邮箱
  isEmail: function isEmail(field) {
    return hookTest('email', field);
  },


  // IP 地址
  isIp: function isIp(field) {
    return hookTest('ip', field);
  },


  // 座机
  isTel: function isTel(field) {
    return hookTest('tel', field);
  },


  // 手机
  isPhone: function isPhone(field) {
    return hookTest('phone', field);
  },


  // 字母数字下划线
  isAbc: function isAbc(field) {
    return hookTest('abc', field);
  },


  // URL
  isUrl: function isUrl(field) {
    return hookTest('url', field);
  },


  // 日期
  isDate: function isDate(field) {
    // 解析日期
    var thatDate = (0, _util.getValue)(field);
    if (_regex2.default.date.test(thatDate)) {
      thatDate = thatDate.split('-');
      var year = parseInt(thatDate[0], 10);
      var month = parseInt(thatDate[1], 10);
      var day = parseInt(thatDate[2], 10);

      if (year < 1 || year > 9999 || month < 1 || month > 12) {
        return false;
      }

      var numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      // 闰年 2 月 29 号
      if (year % 400 === 0 || year % 100 !== 0 && year % 4 === 0) {
        numDays[1] = 29;
      }

      // 检查日期
      return !(day < 1 || day > numDays[month - 1]);
    }
    return false;
  },


  // 是否为必须
  required: function required(field) {
    // 检查 field 本身
    if ((0, _util.isEmpty)(field)) {
      return false;
    }
    if (Array.isArray(field)) {
      return !!field.length;
    }
    if (Array.isArray(field.value)) {
      return !!field.value.length;
    }
    return !(0, _util.isEmpty)((0, _util.getValue)(field));
  },


  // 大于某个数
  greaterThan: function greaterThan(field, param) {
    var value = (0, _util.getValue)(field);
    if (!_regex2.default.decimal.test(value)) {
      return false;
    }
    return parseFloat(value) > parseFloat(param);
  },


  // 小于某个数
  lessThan: function lessThan(field, param) {
    var value = (0, _util.getValue)(field);
    if (!_regex2.default.decimal.test(value)) {
      return false;
    }
    return parseFloat(value) < parseFloat(param);
  },


  // 最大长度
  maxLength: function maxLength(field, length) {
    if (!_regex2.default.integer.test(length)) {
      return false;
    }
    return (0, _util.getValue)(field).length <= parseInt(length, 10);
  },


  // 最小长度
  minLength: function minLength(field, length) {
    if (!_regex2.default.integer.test(length)) {
      return false;
    }
    return (0, _util.getValue)(field).length >= parseInt(length, 10);
  },


  // 大于某个日期
  greaterThanDate: function greaterThanDate(field, date) {
    var currentDate = (0, _util.parseToDate)((0, _util.getValue)(field));
    var paramDate = (0, _util.parseToDate)(date);

    if (!(paramDate && currentDate)) {
      return false;
    }
    return currentDate > paramDate;
  },


  // 小于某个日期
  lessThanDate: function lessThanDate(field, date) {
    var currentDate = (0, _util.parseToDate)((0, _util.getValue)(field));
    var paramDate = (0, _util.parseToDate)(date);

    if (!(paramDate && currentDate)) {
      return false;
    }
    return currentDate < paramDate;
  }
};
//# sourceMappingURL=testHook.js.map