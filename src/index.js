import * as validators from './validators';

export const getValidator = validator => {
  const name = Object.keys(validator)[0];
  const config = validator[name];
  const func = validators[name];
  if (!func) {
    throw `Validator '${name}' could not be found! Try to define it with: addValidator(${name}, <callback>)`;
  }
  return func(config);
};

export const addValidator = (name, callback) => {
  validators[name] = callback;
  return validators[name];
};
