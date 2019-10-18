import { assert } from 'chai';
import { addValidator, getValidator } from '../src/index';

describe('Tests for Creating a Validator', () => {
  it('"getValidator" throws an error and error when "options" parameter is undefined', () => {
    assert.throws(() => {
      getValidator();
    }, '"options" must be an object. For example: { name: "required" }, { name: "precision", validValue: 4 }, { name: "between", validValue: [1, 4] }, { name: "maxDistance", validValue: 100 }');
  });

  it('"getValidator" throws an error when "options.name" parameter is undefined', () => {
    assert.throws(() => {
      getValidator({});
    }, '"options.name" is required and should be one of: ');
  });

  it('"getValidator" throws an error when "validator" does not exist', () => {
    const name = 'nonExistingValidator';
    assert.throws(() => {
      getValidator({ name, validValue: 123 });
    }, `Validator "${name}" could not be found! Try to define it with: addValidator({ name: "${name}", validValue: "someValidValue", validate: (value) => { return value === "someValidValue" }})`);
  });

  it('"addValidator" throws an error and error when "options" parameter is undefined', () => {
    assert.throws(() => {
      addValidator();
    }, '"options" must be an object. For example: { name: "someName", validValue: "someValidValue", validate: (value) => { return value === "someValidValue" }}');
  });

  it('"addValidator" throws an error when "options.name" parameter is undefined', () => {
    assert.throws(() => {
      addValidator({});
    }, '"options.name" is required');
  });

  it('"addValidator" throws an error when "validator" exists', () => {
    const name = 'precision';
    assert.throws(() => {
      addValidator({ name });
    }, `Validator "${name}" already exists! You can call it with: getValidator({ name: "${name}", validValue: "someValidValue" })`);
  });

  it('Get a validator', () => {
    const name = 'precision',
      errorMessage = 'some error message',
      validator = getValidator({ name, errorMessage, validValue: 4 });
    assert.isDefined(validator);
    assert.isDefined(validator.name);
    assert.equal(validator.name, name);
    assert.isDefined(validator.errorMessage);
    assert.equal(validator.errorMessage, errorMessage);
    assert.isFunction(validator.validate);
  });

  it('Add a custom validator', async done => {
    const name = 'exact',
      errorMessage = 'value must be eqaul to 1',
      validValue = 1,
      validate = value => {
        assert.isTrue(value === validValue);
        done();
      };

    const validator = addValidator({
      name,
      errorMessage,
      validValue,
      validate
    });
    assert.isDefined(validator);
    assert.isFunction(validator.validate);
    validator.validate(validValue);
  });
});
