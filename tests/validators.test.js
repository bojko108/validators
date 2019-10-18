import { assert } from 'chai';
import { getValidator } from '../src/index';

describe('Tests for Validators', () => {
  it('Test "isDefined" validator', () => {
    const validator = getValidator({ name: 'isDefined' });
    assert.isTrue(validator.validate('asd'));
    assert.isTrue(validator.validate({ a: 'test' }));
    assert.isTrue(validator.validate(1));
    assert.isTrue(validator.validate(true));
    assert.isTrue(validator.validate(false));
    assert.isTrue(validator.validate(0));
    assert.isTrue(validator.validate(''));
    assert.isFalse(validator.validate());
    assert.isFalse(validator.validate(undefined));
    assert.isFalse(validator.validate(null));
  });

  it('Test "precision" validator', () => {
    const validator = getValidator({ name: 'precision', validValue: 10 });
    assert.isTrue(validator.validate({ coords: { accuracy: 4 } }));
    assert.isTrue(validator.validate({ accuracy: 10 }));
    assert.isFalse(validator.validate({ accuracy: 12 }));
  });

  it('Test "min" validator', () => {
    const validator = getValidator({ name: 'min', validValue: 3 });
    assert.isFalse(validator.validate('as'));
    assert.isTrue(validator.validate('asd'));
    assert.isTrue(validator.validate('asdf'));

    assert.isFalse(validator.validate([1, 2]));
    assert.isTrue(validator.validate([1, 2, 3]));
    assert.isTrue(validator.validate([1, 2, 3, 4]));
  });

  it('Test "max" validator', () => {
    const validator = getValidator({ name: 'max', validValue: 3 });
    assert.isTrue(validator.validate('as'));
    assert.isTrue(validator.validate('asd'));
    assert.isFalse(validator.validate('asdf'));

    assert.isTrue(validator.validate([1, 2]));
    assert.isTrue(validator.validate([1, 2, 3]));
    assert.isFalse(validator.validate([1, 2, 3, 4]));
  });

  it('Test "contain" validator', () => {
    const validator = getValidator({ name: 'contain', validValue: 'test' });
    assert.isTrue(validator.validate('testA'));
    assert.isTrue(validator.validate('B test'));
    assert.isFalse(validator.validate('asd'));
    assert.isTrue(validator.validate([1, 'test']));
    assert.isFalse(validator.validate([1, 2]));
  });

  it('Test "notContain" validator', () => {
    const validator = getValidator({ name: 'contain', validValue: 'test' });
    assert.isTrue(validator.validate('testA'));
    assert.isTrue(validator.validate('B test'));
    assert.isFalse(validator.validate('asd'));
    assert.isTrue(validator.validate([1, 'test']));
    assert.isFalse(validator.validate([1, 2]));
  });

  it('Test "equal" validator', () => {
    const validator = getValidator({ name: 'equal', validValue: 2 });
    assert.isTrue(validator.validate(2));
    assert.isFalse(validator.validate(22));
    assert.isTrue(validator.validate('2'));
  });

  it('Test "notEqual" validator', () => {
    const validator = getValidator({ name: 'notEqual', validValue: 2 });
    assert.isFalse(validator.validate(2));
    assert.isTrue(validator.validate(22));
    assert.isFalse(validator.validate('2'));
  });

  it('Test "like" validator', () => {
    const validator = getValidator({ name: 'like', validValue: 'test' });
    assert.isTrue(validator.validate('test'));
    assert.isFalse(validator.validate('test A'));
    assert.isFalse(validator.validate('Test'));
  });

  it('Test "notLike" validator', () => {
    const validator = getValidator({ name: 'notLike', validValue: 'test' });
    assert.isFalse(validator.validate('test'));
    assert.isTrue(validator.validate('test A'));
    assert.isTrue(validator.validate('Test'));
  });

  it('Test "between" validator', () => {
    const validator = getValidator({ name: 'between', validValue: [1, 4] });
    assert.isTrue(validator.validate(1));
    assert.isTrue(validator.validate(2));
    assert.isTrue(validator.validate(4));
    assert.isFalse(validator.validate(6));
  });

  it('Test "notBetween" validator', () => {
    const validator = getValidator({ name: 'notBetween', validValue: [1, 4] });
    assert.isFalse(validator.validate(1));
    assert.isFalse(validator.validate(2));
    assert.isFalse(validator.validate(4));
    assert.isTrue(validator.validate(6));
  });

  it('Test "inValues" validator', () => {
    let validator = getValidator({ name: 'inValues', validValue: [1, 2, 3] });
    assert.isTrue(validator.validate(1));
    assert.isTrue(validator.validate(2));
    assert.isTrue(validator.validate(3));
    assert.isFalse(validator.validate(4));

    validator = getValidator({ name: 'inValues', validValue: ['a', 'b'] });
    assert.isTrue(validator.validate('a'));
    assert.isTrue(validator.validate('b'));
    assert.isFalse(validator.validate('c'));
  });

  it('Test "notInValues" validator', () => {
    let validator = getValidator({ name: 'notInValues', validValue: [1, 2, 3] });
    assert.isFalse(validator.validate(1));
    assert.isFalse(validator.validate(2));
    assert.isFalse(validator.validate(3));
    assert.isTrue(validator.validate(4));

    validator = getValidator({ name: 'notInValues', validValue: ['a', 'b'] });
    assert.isFalse(validator.validate('a'));
    assert.isFalse(validator.validate('b'));
    assert.isTrue(validator.validate('c'));
  });

  it('Test "greaterThan" validator', () => {
    const validator = getValidator({ name: 'greaterThan', validValue: 2 });
    assert.isTrue(validator.validate(12));
    assert.isFalse(validator.validate(2));
    assert.isFalse(validator.validate(1));
  });

  it('Test "greaterThanOrEqual" validator', () => {
    const validator = getValidator({ name: 'greaterThanOrEqual', validValue: 2 });
    assert.isTrue(validator.validate(2));
    assert.isTrue(validator.validate(12));
    assert.isFalse(validator.validate(1));
  });

  it('Test "lessThan" validator', () => {
    const validator = getValidator({ name: 'lessThan', validValue: 2 });
    assert.isTrue(validator.validate(1));
    assert.isTrue(validator.validate(0));
    assert.isFalse(validator.validate(2));
  });

  it('Test "lessThanOrEqual" validator', () => {
    const validator = getValidator({ name: 'lessThanOrEqual', validValue: 2 });
    assert.isTrue(validator.validate(2));
    assert.isTrue(validator.validate(1));
    assert.isFalse(validator.validate(22));
  });

  it('Test "isString" validator', () => {
    const validator = getValidator({ name: 'isString' });
    assert.isTrue(validator.validate('test'));
    assert.isTrue(validator.validate('2'));
    assert.isTrue(validator.validate('false'));
    assert.isFalse(validator.validate(false));
    assert.isFalse(validator.validate(1));
    assert.isFalse(validator.validate());
  });

  it('Test "isArray" validator', () => {
    const validator = getValidator({ name: 'isArray' });
    assert.isTrue(validator.validate([]));
    assert.isTrue(validator.validate(['2']));
    assert.isFalse(validator.validate(false));
    assert.isFalse(validator.validate(1));
    assert.isFalse(validator.validate({}));
    assert.isFalse(validator.validate());
  });

  it('Test "isNumber" validator', () => {
    const validator = getValidator({ name: 'isNumber' });
    assert.isTrue(validator.validate(1));
    assert.isTrue(validator.validate(-1));
    assert.isFalse(validator.validate('1'));
    assert.isFalse(validator.validate());
    assert.isFalse(validator.validate({}));
    assert.isFalse(validator.validate(false));
  });

  it('Test "isInteger" validator', () => {
    const validator = getValidator({ name: 'isInteger' });
    assert.isTrue(validator.validate(1));
    assert.isTrue(validator.validate(-1));
    assert.isFalse(validator.validate(3.1415926536));
  });

  it('Test "isBoolean" validator', () => {
    const validator = getValidator({ name: 'isBoolean' });
    assert.isTrue(validator.validate(true));
    assert.isTrue(validator.validate(false));
    assert.isFalse(validator.validate(1));
    assert.isFalse(validator.validate(0));
    assert.isFalse(validator.validate('true'));
    assert.isFalse(validator.validate());
  });
});
