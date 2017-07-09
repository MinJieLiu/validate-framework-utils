import regex from './regex';
import {
  getValue,
  parseToDate,
} from './util';

/**
 * 验证方法
 */
export default {

  // 自然数
  isNumeric(field) {
    return regex.numeric.test(getValue(field));
  },

  // 整数
  isInteger(field) {
    return regex.integer.test(getValue(field));
  },

  // 浮点数
  isDecimal(field) {
    return regex.decimal.test(getValue(field));
  },

  // 邮箱
  isEmail(field) {
    return regex.email.test(getValue(field));
  },

  // IP 地址
  isIp(field) {
    return regex.ip.test(getValue(field));
  },

  // 座机
  isTel(field) {
    return regex.tel.test(getValue(field));
  },

  // 手机
  isPhone(field) {
    return regex.phone.test(getValue(field));
  },

  // 字母数字下划线
  isAbc(field) {
    return regex.abc.test(getValue(field));
  },

  // URL
  isUrl(field) {
    return regex.url.test(getValue(field));
  },

  // 日期
  isDate(field) {
    // 解析日期
    let thatDate = getValue(field);
    if (regex.date.test(thatDate)) {
      thatDate = thatDate.split('-');
      const year = parseInt(thatDate[0], 10);
      const month = parseInt(thatDate[1], 10);
      const day = parseInt(thatDate[2], 10);

      if (year < 1 || year > 9999 || month < 1 || month > 12) {
        return false;
      }

      const numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      // 闰年 2 月 29 号
      if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        numDays[1] = 29;
      }

      // 检查日期
      return !(day < 1 || day > numDays[month - 1]);
    }
    return false;
  },

  // 是否为必须
  required(field) {
    if (typeof field === 'string') {
      return field !== '';
    } else if (Array.isArray(field.value)) {
      return field.value.length;
    }
    return field.value !== null && field.value !== undefined && field.value !== '';
  },

  // 大于某个数
  greaterThan(field, param) {
    const value = getValue(field);
    if (!regex.decimal.test(value)) {
      return false;
    }
    return (parseFloat(value) > parseFloat(param));
  },

  // 小于某个数
  lessThan(field, param) {
    const value = getValue(field);
    if (!regex.decimal.test(value)) {
      return false;
    }
    return (parseFloat(value) < parseFloat(param));
  },

  // 最大长度
  maxLength(field, length) {
    if (!regex.integer.test(length)) {
      return false;
    }
    return (getValue(field).length <= parseInt(length, 10));
  },

  // 最小长度
  minLength(field, length) {
    if (!regex.integer.test(length)) {
      return false;
    }
    return (getValue(field).length >= parseInt(length, 10));
  },

  // 大于某个日期
  greaterThanDate(field, date) {
    const currentDate = parseToDate(getValue(field));
    const paramDate = parseToDate(date);

    if (!(paramDate && currentDate)) {
      return false;
    }
    return currentDate > paramDate;
  },

  // 小于某个日期
  lessThanDate(field, date) {
    const currentDate = parseToDate(getValue(field));
    const paramDate = parseToDate(date);

    if (!(paramDate && currentDate)) {
      return false;
    }
    return currentDate < paramDate;
  },

};
