'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* eslint-disable no-confusing-arrow */

/**
 * 获取 value
 * @param {Object|String} field - 域
 * @return {String}
 */
var getValue = exports.getValue = function getValue(field) {
  return (typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object' ? field.value : field;
};

/**
 * 字符串转换为日期
 * @param {String} param - 日期格式：YYYY-MM-DD
 * @return {Date}
 */
var parseToDate = exports.parseToDate = function parseToDate(param) {
  var thatDate = new Date();
  var dateArray = param.split('-');
  thatDate.setFullYear(dateArray[0]);
  thatDate.setMonth(dateArray[1] - 1);
  thatDate.setDate(dateArray[2]);
  return thatDate;
};

/**
 * 判断是否为空值
 * @param value
 */
var isEmpty = exports.isEmpty = function isEmpty(value) {
  return value === null || value === undefined || value === '';
};

/**
 * 判断是否为 Promise
 * @param obj
 * @return {boolean}
 */
var isPromise = exports.isPromise = function isPromise(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.then === 'function';
};
//# sourceMappingURL=util.js.map