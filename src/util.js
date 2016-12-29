/**
 * 获取 value 属性
 * @param {*} field 域
 * @return {String}
 */
export function getValue(field) {
  return (typeof field === 'object') ? field.value : field;
}

/**
 * 字符串转换为日期
 * @param {String} param 日期格式：YYYY-MM-DD
 * @return {Date}
 */
export function parseToDate(param) {
  const thatDate = new Date();
  const dateArray = param.split('-');

  thatDate.setFullYear(dateArray[0]);
  thatDate.setMonth(dateArray[1] - 1);
  thatDate.setDate(dateArray[2]);
  return thatDate;
}
