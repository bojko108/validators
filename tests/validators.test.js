import { assert } from 'chai';
import { addValidator, getValidator } from '../src/index';

describe('Tests for Validators', () => {
  it('Throws and error when validator parameter is undefined', () => {
    assert.throws(() => {
      getValidator();
    }, "'validator' must be an object with a single property, which must be equal to one of the validator functions. For example: { required: null }, { precision: 4 }, { between: [1, 4] }, { maxDistance: 100 }");
  });

  it('Throws and error when validator does not exist', () => {
    const name = 'nonExistingValidator';
    assert.throws(() => {
      getValidator({ [name]: 123 });
    }, `Validator '${name}' could not be found! Try to define it with: addValidator(${name}, <callback>)`);
  });

  it('Get a validator', () => {
    const validator = getValidator({ precision: 4 });
    assert.isDefined(validator);
    assert.isFunction(validator);
  });

  it('Add a custom validator', async done => {
    const validator = addValidator('test', value => {
      assert.isTrue(value);
      done();
    });
    assert.isDefined(validator);
    assert.isFunction(validator);

    validator(true);
  });

  it('Test "isDefined" validator', () => {
    const validator = getValidator({ isDefined: null });
    assert.isTrue(validator('asd'));
    assert.isTrue(validator({ a: 'test' }));
    assert.isTrue(validator(1));
    assert.isTrue(validator(true));
    assert.isFalse(validator());
    assert.isFalse(validator(''));
    assert.isFalse(validator(undefined));
    assert.isFalse(validator(null));
  });

  it('Test "precision" validator', () => {
    const validator = getValidator({ precision: 10 });
    assert.isTrue(validator({ coords: { accuracy: 4 } }));
    assert.isTrue(validator({ accuracy: 10 }));
    assert.isFalse(validator({ accuracy: 12 }));
  });

  it('Test "min" validator', () => {
    const validator = getValidator({ min: 3 });
    assert.isFalse(validator('as'));
    assert.isTrue(validator('asd'));
    assert.isTrue(validator('asdf'));

    assert.isFalse(validator([1, 2]));
    assert.isTrue(validator([1, 2, 3]));
    assert.isTrue(validator([1, 2, 3, 4]));
  });

  it('Test "max" validator', () => {
    const validator = getValidator({ max: 3 });
    assert.isTrue(validator('as'));
    assert.isTrue(validator('asd'));
    assert.isFalse(validator('asdf'));

    assert.isTrue(validator([1, 2]));
    assert.isTrue(validator([1, 2, 3]));
    assert.isFalse(validator([1, 2, 3, 4]));
  });

  it('Test "contain" validator', () => {
    const validator = getValidator({ contain: 'test' });
    assert.isTrue(validator('testA'));
    assert.isTrue(validator('B test'));
    assert.isFalse(validator('asd'));
    assert.isTrue(validator([1, 'test']));
    assert.isFalse(validator([1, 2]));
  });

  it('Test "notContain" validator', () => {
    const validator = getValidator({ contain: 'test' });
    assert.isTrue(validator('testA'));
    assert.isTrue(validator('B test'));
    assert.isFalse(validator('asd'));
    assert.isTrue(validator([1, 'test']));
    assert.isFalse(validator([1, 2]));
  });

  it('Test "equal" validator', () => {
    const validator = getValidator({ equal: 2 });
    assert.isTrue(validator(2));
    assert.isFalse(validator(22));
    assert.isTrue(validator('2'));
  });

  it('Test "notEqual" validator', () => {
    const validator = getValidator({ notEqual: 2 });
    assert.isFalse(validator(2));
    assert.isTrue(validator(22));
    assert.isFalse(validator('2'));
  });

  it('Test "like" validator', () => {
    const validator = getValidator({ like: 'test' });
    assert.isTrue(validator('test'));
    assert.isFalse(validator('test A'));
    assert.isFalse(validator('Test'));
  });

  it('Test "notLike" validator', () => {
    const validator = getValidator({ notLike: 'test' });
    assert.isFalse(validator('test'));
    assert.isTrue(validator('test A'));
    assert.isTrue(validator('Test'));
  });

  it('Test "between" validator', () => {
    const validator = getValidator({ between: [1, 4] });
    assert.isTrue(validator(1));
    assert.isTrue(validator(2));
    assert.isTrue(validator(4));
    assert.isFalse(validator(6));
  });

  it('Test "notBetween" validator', () => {
    const validator = getValidator({ notBetween: [1, 4] });
    assert.isFalse(validator(1));
    assert.isFalse(validator(2));
    assert.isFalse(validator(4));
    assert.isTrue(validator(6));
  });

  it('Test "inValues" validator', () => {
    let validator = getValidator({ inValues: [1, 2, 3] });
    assert.isTrue(validator(1));
    assert.isTrue(validator(2));
    assert.isTrue(validator(3));
    assert.isFalse(validator(4));

    validator = getValidator({ inValues: ['a', 'b'] });
    assert.isTrue(validator('a'));
    assert.isTrue(validator('b'));
    assert.isFalse(validator('c'));
  });

  it('Test "notInValues" validator', () => {
    let validator = getValidator({ notInValues: [1, 2, 3] });
    assert.isFalse(validator(1));
    assert.isFalse(validator(2));
    assert.isFalse(validator(3));
    assert.isTrue(validator(4));

    validator = getValidator({ notInValues: ['a', 'b'] });
    assert.isFalse(validator('a'));
    assert.isFalse(validator('b'));
    assert.isTrue(validator('c'));
  });

  it('Test "greaterThan" validator', () => {
    const validator = getValidator({ greaterThan: 2 });
    assert.isTrue(validator(12));
    assert.isFalse(validator(2));
    assert.isFalse(validator(1));
  });

  it('Test "greaterThanOrEqual" validator', () => {
    const validator = getValidator({ greaterThanOrEqual: 2 });
    assert.isTrue(validator(2));
    assert.isTrue(validator(12));
    assert.isFalse(validator(1));
  });

  it('Test "lessThan" validator', () => {
    const validator = getValidator({ lessThan: 2 });
    assert.isTrue(validator(1));
    assert.isTrue(validator(0));
    assert.isFalse(validator(2));
  });

  it('Test "lessThanOrEqual" validator', () => {
    const validator = getValidator({ lessThanOrEqual: 2 });
    assert.isTrue(validator(2));
    assert.isTrue(validator(1));
    assert.isFalse(validator(22));
  });

  it('Test "isString" validator', () => {
    const validator = getValidator({ isString: null });
    assert.isTrue(validator('test'));
    assert.isTrue(validator('2'));
    assert.isTrue(validator('false'));
    assert.isFalse(validator(false));
    assert.isFalse(validator(1));
    assert.isFalse(validator());
  });

  it('Test "isArray" validator', () => {
    const validator = getValidator({ isArray: null });
    assert.isTrue(validator([]));
    assert.isTrue(validator(['2']));
    assert.isFalse(validator(false));
    assert.isFalse(validator(1));
    assert.isFalse(validator({}));
    assert.isFalse(validator());
  });

  it('Test "isNumber" validator', () => {
    const validator = getValidator({ isNumber: null });
    assert.isTrue(validator(1));
    assert.isTrue(validator(-1));
    assert.isFalse(validator('1'));
    assert.isFalse(validator());
    assert.isFalse(validator({}));
    assert.isFalse(validator(false));
  });

  it('Test "isInteger" validator', () => {
    const validator = getValidator({ isInteger: null });
    assert.isTrue(validator(1));
    assert.isTrue(validator(-1));
    assert.isFalse(validator(3.1415926536));
  });

  it('Test "isBoolean" validator', () => {
    const validator = getValidator({ isBoolean: null });
    assert.isTrue(validator(true));
    assert.isTrue(validator(false));
    assert.isFalse(validator(1));
    assert.isFalse(validator(0));
    assert.isFalse(validator('true'));
    assert.isFalse(validator());
  });
});
