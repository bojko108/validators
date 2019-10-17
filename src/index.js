import * as validators from './validators';

/**
 * Get a validator function
 * @param {Object} validator - defines validator name and config. An object with a single property, which must be equal to
 * one of the validator functions. The value of this property can be any type.
 * @throws {Error} when `validator` parameter is not defined
 * @throws {Error} when there is no validation function defined
 * @return {function(value: *): Boolean} validator function
 * @example
 * getValidator({ required: null }) => `required` validator
 * getValidator({ precision: 4 }) => `precision` validator with accuracy 4 meters
 * getValidator({ between: [1, 4] }) => `between` validator with valid range [1, 4]
 * getValidator({ maxDistance: 100 }) => `maxDistance` validator with maxumum distance 100 meters
 */
export const getValidator = validator => {
  if (!validator) {
    throw "'validator' must be an object with a single property, which must be equal to one of the validator functions. For example: { required: null }, { precision: 4 }, { between: [1, 4] }, { maxDistance: 100 }";
  }
  const name = Object.keys(validator)[0];
  const config = validator[name];
  const func = validators[name];
  if (!func) {
    throw `Validator '${name}' could not be found! Try to define it with: addValidator(${name}, <callback>)`;
  }
  return func(config);
};

/**
 *
 * @param {!String} name - name of the custom validator
 * @param {!function(value: *): Boolean} callback - function that receives a `value` and must return a boolean.
 * @return {function(value: *): Boolean} validator function
 */
export const addValidator = (name, callback) => {
  validators[name] = callback;
  return validators[name];
};
