/* eslint-disable no-confusing-arrow */

/**
 * 获取 value
 * @param {Object|String} field - 域
 * @return {String}
 */
export const getValue = field => typeof field === 'object' ? field.value : field;

/**
 * 字符串转换为日期
 * @param {String} param - 日期格式：YYYY-MM-DD
 * @return {Date}
 */
export const parseToDate = (param) => {
  const thatDate = new Date();
  const dateArray = param.split('-');
  thatDate.setFullYear(dateArray[0]);
  thatDate.setMonth(dateArray[1] - 1);
  thatDate.setDate(dateArray[2]);
  return thatDate;
};

/**
 * 判断是否为空值
 * @param value
 */
export const isEmpty = value => value === null || value === undefined || value === '';
