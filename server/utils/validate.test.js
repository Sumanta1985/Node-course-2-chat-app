var expect=require('expect');

const {isStringValid}=require('./validate');

describe('isString',()=>{
  it('should validate that a string',()=>{
//    var str='  123';
    expect(isStringValid('123')).toBe(true);
    expect(isStringValid('  ')).toBe(false);
    expect(isStringValid(' sumanta  ')).toBe(true);
  });
});
