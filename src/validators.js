export { maxDistance } from './gisValidators';
/**
 * For **Location** - `value` is more precise than `validValue`
 * @example
 * getValidator({ precision: 10 })({ accuracy: 4 }) => true
 * getValidator({ precision: 10 })({ accuracy: 12 }) => false
 */
export const precision = precision => {
  // value actualy is a location object, returned by the GPS
  return value => {
    const coords = value.coords || value;
    return coords.accuracy <= precision;
  };
};
/**
 * For **Array**, **String** - `value` length is greater than or equal to `min`
 * @example
 * getValidator({ min: 3 })('as') => false
 * getValidator({ min: 3 })('asd') => true
 * getValidator({ min: 3 })('asdf') => true
 */
export const min = min => {
  return value => value.length >= min;
};
/**
 * For **Array**, **String** - `value` length is greater than or equal to `max`
 * @example
 * getValidator({ max: 3 })('as') => true
 * getValidator({ max: 3 })('asd') => true
 * getValidator({ max: 3 })('asdf') => false
 */
export const max = max => {
  return value => value.length <= max;
};
/**
 * For **String** - `value` contains `validValue`
 * @example
 * getValidator({ contain: 'test' })('testA') => true
 * getValidator({ contain: 'test' })('B test') => true
 * getValidator({ contain: 'test' })('asd') => false
 */
export const contain = validValue => {
  return value => {
    return value ? value.indexOf(validValue) > -1 : false;
  };
};
/**
 * For **String** - `value` contains `validValue`
 * @example
 * getValidator({ notContain: 'test' })('testA') => false
 * getValidator({ notContain: 'test' })('B test') => false
 * getValidator({ notContain: 'test' })('asd') => true
 */
export const notContain = validValue => {
  return value => {
    return value ? value.indexOf(validValue) === -1 : false;
  };
};
/**
 * For **String** - `value` is equal to `validValue`
 * @example
 * getValidator({ like: 'test' })('test') => true
 * getValidator({ like: 'test' })('Test') => false
 * getValidator({ like: 'test' })('asdasd') => false
 */
export const like = validValue => {
  return value => {
    if (!value) return false;
    return value ? value.toString() === validValue.toString() : false;
  };
};
/**
 * For **String** - `value` is not equal to `validValue`
 * @example
 * getValidator({ notLike: 'test' })('asd') => true
 * getValidator({ notLike: 'test' })('Test') => false
 * getValidator({ notLike: 'test' })('test') => false
 */
export const notLike = validValue => {
  return value => {
    if (!value) return false;
    return value ? value.toString() !== validValue.toString() : false;
  };
};
/**
 * For **Number** - `value` is equal to `validValue`
 * @example
 * getValidator({ equal: 2 })(2) => true
 * getValidator({ equal: 2 })(22) => false
 * getValidator({ equal: 'test' })('test') => false
 */
export const equal = validValue => {
  return value => {
    return Number(validValue) === Number(value);
  };
};
/**
 * For **Number** - `value` is not equal to `validValue`
 * @example
 * getValidator({ notEqual: 1 })(2) => true
 * getValidator({ notEqual: 1 })(1) => false
 * getValidator({ notEqual: 'test' })('test') => true
 * getValidator({ notEqual: 'test' })('asdd') => true
 */
export const notEqual = validValue => {
  return value => {
    return Number(value) !== Number(validValue);
  };
};
/**
 * For **Number** - `value` is in range of `validValue`
 * @example
 * getValidator({ between: [1, 4] })(1) => true
 * getValidator({ between: [1, 4] })(4) => true
 * getValidator({ between: [1, 4] })(6) => false
 */
export const between = validValue => {
  return value => Number(validValue[0]) <= Number(value) && Number(validValue[1]) >= Number(value);
};
/**
 * For **Number** - `value` is not in range of `validValue`
 * @example
 * getValidator({ notBetween: [1, 4] })(1) => false
 * getValidator({ notBetween: [1, 4] })(2) => false
 * getValidator({ notBetween: [1, 4] })(4) => false
 * getValidator({ notBetween: [1, 4] })(6) => true
 */
export const notBetween = validValue => {
  return value => Number(validValue[0]) > Number(value) || Number(validValue[1]) < Number(value);
};
/**
 * For **Number, String** - `value` is in `validValue` array
 * @example
 * getValidator({ inValues: [1, 2, 3] })(1) => true
 * getValidator({ inValues: [1, 2, 3] })(2) => true
 * getValidator({ inValues: [1, 2, 3] })(3) => true
 * getValidator({ inValues: [1, 2, 3] })(4) => false
 */
export const inValues = validValue => {
  return value => {
    if (!value) return false;
    const valuesIn = validValue.map(v => v.toString());
    return valuesIn.indexOf(value.toString()) > -1;
  };
};
/**
 * For **Number, String** - `value` is not in `validValue` array
 * @example
 * getValidator({ notInValues: [1, 2, 3] })(4) => true
 * getValidator({ notInValues: [1, 2, 3] })(3) => false
 * getValidator({ notInValues: [1, 2, 3] })(2) => false
 * getValidator({ notInValues: [1, 2, 3] })(1) => false
 */
export const notInValues = validValue => {
  return value => {
    if (!value) return false;
    const valuesNotIn = validValue.map(v => v.toString());
    return valuesNotIn.indexOf(value.toString()) === -1;
  };
};
/**
 * For **Number** - `value` is greater than `validValue`
 * @example
 * getValidator({ greaterThan: 2 })(12) => true
 * getValidator({ greaterThan: 2 })(2) => false
 * getValidator({ greaterThan: 2 })(1) => false
 */
export const greaterThan = validValue => {
  return value => {
    return Number(value) > Number(validValue);
  };
};
/**
 * For **Number** - `value` is greater than or equal to `validValue`
 * @example
 * getValidator({ greaterThanOrEqual: 2 })(2) => true
 * getValidator({ greaterThanOrEqual: 2 })(12) => true
 * getValidator({ greaterThanOrEqual: 2 })(1) => false
 */
export const greaterThanOrEqual = validValue => {
  return value => {
    return Number(value) >= Number(validValue);
  };
};
/**
 * For **Number** - `value` is less than `validValue`
 * @example
 * getValidator({ lessThan: 2 })(1) => true
 * getValidator({ lessThan: 2 })(0) => true
 * getValidator({ lessThan: 2 })(2) => false
 */
export const lessThan = validValue => {
  return value => {
    return Number(value) < Number(validValue);
  };
};
/**
 * For **Number** - `value` is less than or equal `validValue`
 * @example
 * getValidator({ lessThanOrEqual: 2 })(2) => true
 * getValidator({ lessThanOrEqual: 2 })(1) => true
 * getValidator({ lessThanOrEqual: 2 })(22) => false
 */
export const lessThanOrEqual = validValue => {
  return value => {
    return Number(value) <= Number(validValue);
  };
};
