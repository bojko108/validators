import * as validators from './validators';

/**
 * @typedef Validator
 * @property {!String} name - name of the validator
 * @property {*} validValue - valid value for this validator
 * @property {function(value:*):Boolean} validate - validator function which takes values and validates them
 * @property {String} [errorMessage]
 */
/**
 * @typedef ValidatorFunction - function stored in `getValidator().validate`
 * @param {*} value - value that needs to be validated
 * @return {Boolean}
 */
/**
 * @typedef ValidatorOptions
 * @property {!String} name - name of the validator - should be unique
 * @property {!*} validValue - valid value for this validator
 * @property {String} [errorMessage]
 */

/**
 * Get a validator function
 * @param {!ValidatorOptions} options - defines validator options
 * @return {Validator} validator
 * @throws {Error} when `options` parameter is not defined
 * @throws {Error} when `options.name` parameter is not defined
 * @throws {Error} when there is no validation function defined
 * @example
 * getValidator({ name: 'required' }) => `required` validator
 * getValidator({ name: 'precision', validValue: 4 }) => `precision` validator with accuracy 4 meters
 * getValidator({ name: 'between', validValue: [1, 4] }) => `between` validator with valid range [1, 4]
 * getValidator({ name: 'maxDistance' validValue: 100 }) => `maxDistance` validator with maxumum distance 100 meters
 */
export const getValidator = options => {
  if (!options) {
    throw '"options" must be an object. For example: { name: "required" }, { name: "precision", validValue: 4 }, { name: "between", validValue: [1, 4] }, { name: "maxDistance", validValue: 100 }';
  }
  const { name, validValue, errorMessage } = options;
  let validate = options.validate;
  if (!name) {
    const validNames = Object.keys(validators).join('","');
    throw `"options.name" is required and should be one of: ${validNames}`;
  }
  if (!validate) {
    const func = validators[name];
    if (!func) {
      throw `Validator "${name}" could not be found! Try to define it with: addValidator({ name: "${name}", validValue: "someValidValue", validate: (value) => { return value === "someValidValue" }})`;
    }
    validate = func(validValue);
  }
  return { name, validValue, errorMessage, validate };
};

/**
 * Add a new validator.
 * @param {!Validator} options - options for the custom validator
 * @return {Validator} validator
 * @throws {Error} when `options` parameter is not defined
 * @throws {Error} when `options.name` parameter is not defined
 * @throws {Error} when a validator already exists
 * @throws {Error} when `options.validate` is not a function
 * @example
 * addValidator({ name: "exact", validValue: 1, validate: (value) => value === 1 }) => defines and returns a new validator with name `exact`
 */
export const addValidator = options => {
  if (!options) {
    throw '"options" must be an object. For example: { name: "someName", validValue: "someValidValue", validate: (value) => { return value === "someValidValue" }}';
  }
  const { name, validValue, errorMessage, validate } = options;
  if (!name) {
    throw '"options.name" is required';
  }
  if (name in validators) {
    throw `Validator "${name}" already exists! You can call it with: getValidator({ name: "${name}", validValue: "someValidValue" })`;
  }
  if (!validate || !validators.isFunction(validate)) {
    throw '"options.validate" must be a function';
  }
  validators[name] = validate;
  return { name, validValue, errorMessage, validate };
};
