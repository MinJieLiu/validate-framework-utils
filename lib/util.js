'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getValue = getValue;
exports.parseToDate = parseToDate;
/**
 * 获取 value 属性
 * @param {*} field 域
 * @return {String}
 */
function getValue(field) {
  return (typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object' ? field.value : field;
}

/**
 * 字符串转换为日期
 * @param {String} param 日期格式：YYYY-MM-DD
 * @return {Date}
 */
function parseToDate(param) {
  var thatDate = new Date();
  var dateArray = param.split('-');
  thatDate.setFullYear(dateArray[0]);
  thatDate.setMonth(dateArray[1] - 1);
  thatDate.setDate(dateArray[2]);
  return thatDate;
}
//# sourceMappingURL=util.js.map