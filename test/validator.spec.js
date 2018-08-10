import 'babel-polyfill';
import assert from 'assert';
import { describe, it } from 'mocha';
import V, { validator as v } from '../src';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('validator测试', () => {
  it('required() 必填验证', () => {
    assert(!v.required(''));
    assert((v.required(' ')));
    assert(v.required('null'));
    assert(v.required('ss'));
    assert(v.required(false));
    assert(!v.required(null));
    assert(!v.required(undefined));
    assert(!v.required([]));
    assert(v.required(['1']));
  });

  it('isNumeric() 自然数 验证', () => {
    assert(!v.isNumeric('0000+'));
    assert(v.isNumeric('0000'));
    assert(v.isNumeric('1'));
    assert(v.isNumeric('99999'));
    assert(v.isNumeric('0'));
    assert(!v.isNumeric('-0'));
    assert(!v.isNumeric('-1'));
    assert(!v.isNumeric('1.1'));
    assert(!v.isNumeric('1.11'));
    assert(!v.isDecimal('NaN'));
  });

  it('isInteger() 整数 验证', () => {
    assert(!v.isInteger('0000+'));
    assert(v.isInteger('0000'));
    assert(v.isInteger('1'));
    assert(v.isInteger('99999'));
    assert(v.isInteger('0'));
    assert(v.isInteger('-0'));
    assert(v.isInteger('-1'));
    assert(!v.isInteger('-1.1'));
    assert(!v.isInteger('1.00001'));
    assert(!v.isInteger('1.11111'));
    assert(!v.isDecimal('NaN'));
  });

  it('isDecimal() 浮点数 验证', () => {
    assert(!v.isDecimal('0000+'));
    assert(v.isDecimal('0000'));
    assert(v.isDecimal('1'));
    assert(v.isDecimal('99999'));
    assert(v.isDecimal('0'));
    assert(v.isDecimal('-0'));
    assert(v.isDecimal('-1'));
    assert(v.isDecimal('1.1'));
    assert(v.isDecimal('-1.11'));
    assert(v.isDecimal('-0.11'));
    assert(v.isDecimal('999.999'));
    assert(v.isDecimal('.11'));
    assert(v.isDecimal('0.11'));
    assert(!v.isDecimal('+1.11'));
    assert(!v.isDecimal('NaN'));
  });

  it('isUrl() URL 验证', () => {
    assert(!v.isUrl('://www.ss'));
    assert(!v.isUrl('www.baidu.com'));
    assert(!v.isUrl('abs.abs.baidu.com'));
    assert(v.isUrl('http://baidu.com'));
    assert(!v.isUrl('http:/abs.abs.baidu.com'));
    assert(v.isUrl('http://abs.abs.baidu.com'));
    assert(v.isUrl('hps://www.baidu.com'));
    assert(v.isUrl('hps://www.QQ.com'));
    assert(v.isUrl('hps://www.Tentent.com'));
    assert(v.isUrl('hps://'));
  });

  it('isAbc() 字母数字下划线验证', () => {
    assert(!v.isAbc('086-021'));
    assert(v.isAbc('086_021'));
    assert(v.isAbc('abc23'));
    assert(v.isAbc('abc_23'));
    assert(v.isAbc('AbC_'));
    assert(!v.isAbc('A!'));
  });

  // 邮箱验证 ，暂不匹配中文域名
  it('isEmail() 邮箱验证', () => {
    assert(v.isEmail('d.s.s.d@qq.com.cn'));
    assert(v.isEmail('d.s-s.d@qq.com.cn'));
    assert(v.isEmail('d.s.s.d@qq.cosdfaasdfasdfdsaf.cn.sh.sd.dsfsdfsfd'));
    assert(v.isEmail('ds.sd@qq.com'));
    assert(v.isEmail('dss1234.sd@qq.com'));
    assert(v.isEmail('ds.sd@qq.com.cn'));
    assert(!v.isEmail('@qq.cn'));
    assert(!v.isEmail('saf#qq.cn'));
    assert(v.isEmail('wowohoo@qq.com'));
    assert(v.isEmail('wowo.o@qq.com'));
    assert(v.isEmail('wowo@123.sd'));
    assert(v.isEmail('wowo@123.23'));
    assert(!v.isEmail('wowo.oqqcom'));
    assert(v.isEmail('wowo@123'));
    assert(!v.isEmail('wowo@asdf.中国'));
    assert(!v.isEmail('wowo@中国.com'));
    assert(!v.isEmail('中@qq.com'));
    assert(v.isEmail('Asd@qq.com'));
    assert(v.isEmail('Asd@QQ.com'));
  });

  it('isIp() IP验证', () => {
    assert(v.isIp('01.01.01.0'));
    assert(v.isIp('192.168.1.1'));
    assert(v.isIp('192.168.23.3'));
    assert(v.isIp('192.168.23.3.32.1'));
    assert(!v.isIp('192.168.23.3.32'));
    assert(!v.isIp('192.168.23.3.32.1.2'));
    assert(!v.isIp('192.168.23.3.32.1.wq2'));
    assert(!v.isIp('192.168.2.wq2'));
    assert(!v.isIp('192.168.1'));
    assert(!v.isIp('192.168'));
    assert(!v.isIp('192'));
    assert(!v.isIp('192.168.1.1233'));
    assert(!v.isIp('192.168.1324.123'));
  });

  it('isPhone() 手机号码验证', () => {
    assert(!v.isPhone('136888898'));
    assert(v.isPhone('13688889890'));
    assert(v.isPhone('13012341233'));
    assert(v.isPhone('13688889890'));
    assert(!v.isPhone('613688889890'));
    assert(v.isPhone('19088889890'));
  });

  // 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)
  it('isTel() 座机号码验证', () => {
    assert(v.isTel('086-021-4433432-233'));
    assert(v.isTel('+086-021-4433432-233'));
    assert(!v.isTel('+086-021-4433432-23'));
    assert(v.isTel('+086-021-4433432-2333'));
    assert(!v.isTel('+086-021-4433432-1'));
    assert(!v.isTel('13012341233'));
  });

  // 2010-10-10格式
  it('isDate() 日期格式验证', () => {
    assert(v.isDate('2010-10-10'));
    assert(v.isDate('2010-10-1'));
    assert(!v.isDate('2010-10'));
    assert(v.isDate('2010-1-10'));
    assert(v.isDate('2010-01-10'));
    assert(v.isDate('2010-03-31'));
    assert(v.isDate('2010-04-30'));
    assert(!v.isDate('2010-04-31'));
    assert(!v.isDate('2010--31'));
    assert(!v.isDate('2010-05-32'));
    assert(v.isDate('2016-02-29'));
    assert(!v.isDate('2009-02-29'));
    assert(!v.isDate('2009-00-29'));
    assert(!v.isDate('0000-01-29'));
    assert(!v.isDate('2009-01-00'));
    assert(!v.isDate('2010-01-04-31'));
    assert(!v.isDate('2010 - 10 - 10'));
    assert(!v.isDate('2010-13-10'));
    assert(!v.isDate('2010/10/10'));
    assert(!v.isDate('2010/10-10'));
    assert(!v.isDate('201010-10'));
    assert(!v.isDate('20101010'));
    assert(!v.isDate('2010'));
  });

  it('greaterThan() 大于某个数', () => {
    assert(!v.greaterThan('23', '54'));
    assert(v.greaterThan('23', '11'));
    assert(!v.greaterThan('abc', '11'));
    assert(!v.greaterThan('-11', '0'));
    assert(!v.greaterThan('11', 'abc'));
    assert(!v.greaterThan('11', '11'));
  });

  it('lessThan() 小于某个数', () => {
    assert(v.lessThan('23', '54'));
    assert(!v.lessThan('55', '54'));
    assert(!v.lessThan('abc', '54'));
    assert(!v.lessThan('11', '-1'));
    assert(v.lessThan('0', '54'));
    assert(!v.lessThan('23', 'abc'));
  });

  it('maxLength() 最大长度', () => {
    assert(!v.maxLength('23', '0'));
    assert(v.maxLength('5555555', '7'));
    assert(v.maxLength('abc', '3'));
    assert(v.maxLength('111111', '999'));
    assert(!v.maxLength('0', '0'));
    assert(v.maxLength('2 3', '3'));
    assert(!v.maxLength('2 3', '2'));
  });

  it('minLength() 最小长度', () => {
    assert(v.minLength('23', '0'));
    assert(v.minLength('55', '1'));
    assert(v.minLength('55', '2'));
    assert(!v.minLength('abc', '4'));
    assert(v.minLength('11', '-1'));
    assert(!v.minLength('0 0', '54'));
    assert(v.minLength('   ', '3'));
    assert(!v.minLength('   ', '4'));
  });

  it('greaterThanDate() 大于某个日期', () => {
    assert(!v.greaterThanDate('23', '54'));
    assert(!v.greaterThanDate('2010-10-11', '54'));
    assert(!v.greaterThanDate('2010-01-01', '2010-01-01'));
    assert(v.greaterThanDate('2010-01-02', '2010-01-01'));
    assert(v.greaterThanDate('2020-01-02', '2010-01-02'));
    assert(!v.greaterThanDate('2020-01-02', '2020-11-02'));
    assert(!v.greaterThanDate('2020-01-02', '2020-13-02'));
  });

  it('lessThanDate() 小于某个日期', () => {
    assert(!v.lessThanDate('23', '54'));
    assert(!v.lessThanDate('2010-10-11', '54'));
    assert(!v.lessThanDate('2010-01-01', '2010-01-01'));
    assert(!v.lessThanDate('2010-01-02', '2010-01-01'));
    assert(!v.lessThanDate('2020-01-02', '2010-01-02'));
    assert(v.lessThanDate('2020-01-02', '2020-11-02'));
    assert(v.lessThanDate('2020-01-02', '2020-13-02'));
    assert(v.lessThanDate('2020-21-02', '2022-1-02'));
    assert(v.lessThanDate('2021-2-01', '2020-14-02'));
  });

  it('验证 validator 方法组件', async () => {
    const validateEmailField = v.validateField({
      rules: 'required | isEmail | maxLength(32)',
      messages: '不能为空 | 请输入合法邮箱 | 不能超过 {{param}} 个字符',
    });
    assert((await validateEmailField('123@123.com')).result);
    assert(!(await validateEmailField(null)).result);
    assert(!(await validateEmailField('')).result);
    assert(!(await validateEmailField('123#123.com')).result);
    assert(!(await validateEmailField('123@1231231231231231231231231.com')).result);
    assert((await validateEmailField('123@1231231231231231231231231.com')).error.message === '不能超过 32 个字符');

    const validatePhoneFiled = v.validateField({
      rules: 'isPhone',
      messages: '请输入正确的手机号',
    });
    assert((await validatePhoneFiled('13333333333')).result);
    assert((await validatePhoneFiled('')).result);

    const validateHobbyField = v.validateField({
      rules: 'required',
      messages: '不能为空',
    });
    assert(!(await validateHobbyField([])).result);
    assert((await validateHobbyField([])).error.message === '不能为空');
    assert(!(await validateHobbyField('')).result);
    assert((await validateHobbyField(['1'])).result);
    assert((await validateHobbyField(['1'])).error.message === undefined);
  });

  it('验证 Validator 实例组件', async () => {
    const validator = new V();
    const validateEmailField = validator.validateField({
      rules: 'required | isEmail | maxLength(32)',
      messages: '不能为空 | 请输入合法邮箱 | 不能超过 {{param}} 个字符',
    });
    assert((await validateEmailField('123@123.com')).result);
    assert(!(await validateEmailField('')).result);

    validator.removeMethods('isEmail', 'maxLength');

    assert((await validateEmailField('123#123.com')).result);
    assert((await validateEmailField('123@123.com1111111111111111111111')).result);

    const validateHobbyField = validator.validateField({
      rules: 'limitSelect(2)',
      messages: '不能超过 {{param}} 个',
    });
    validator.addMethods({
      limitSelect(field, param) {
        return field.value.length <= param;
      },
    });
    assert((await validateHobbyField([1, 2])).result);
    assert(!(await validateHobbyField([1, 2, 3])).result);
  });

  it('验证 validator 异步方法', async () => {
    const validator = new V();
    const validateAsyncField = validator.validateField({
      rules: 'isNumeric | doApi',
      messages: '只能为数字 | 长度不小于10',
    });
    validator.addMethods({
      async doApi(field) {
        await sleep(20);
        return field.value.length >= 10;
      },
    });
    assert((await validateAsyncField('123456789')).error.message === '长度不小于10');

    const currentResult = await validateAsyncField('1234567890');
    assert(currentResult.result);
  });
});
