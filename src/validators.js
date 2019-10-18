export { maxDistance } from './gisValidators';

/**
 * Checks whether the `value` is defined or not
 * @example
 * isDefined()(4) => true
 * isDefined()(null) => false
 * isDefined()('') => false
 */
export const isDefined = () => {
  /**
   * @param {*} value - to be checked
   * @return {Boolean}
   */
  const validator = value => !!value;
  return validator;
};
/**
 * For **Location** object - `value` is more precise than `precision`
 * @param {Number} precision - accuracy in meters
 * @example
 * precision(10)({ accuracy: 4 }) => true
 * precision(10)({ accuracy: 12 }) => false
 * precision(10)({ coords: { accuracy: 4 }}) => true
 * precision(10)({ coords: { accuracy: 12 }}) => false
 */
export const precision = precision => {
  /**
   * @param {!Object} value - location object, returned by the GPS
   * @property {Number} [value.accuracy]
   * @property {Object} [value.coords]
   * @property {!Number} value.coords.accuracy
   * @return {Boolean}
   */
  const validator = value => {
    const coords = value.coords || value;
    return coords.accuracy <= precision;
  };
  return validator;
};
/**
 * For **Array**, **String** - `value`'s length is greater than or equal to `min`
 * @param {!Number} min - minimum length value
 * @example
 * min(3)('as') => false
 * min(3)('asd') => true
 * min(3)('asdf') => true
 */
export const min = min => {
  /**
   * @param {!(Array.<*>|String)} value - to be checked
   * @return {Boolean}
   */
  const validator = value => value.length >= min;
  return validator;
};
/**
 * For **Array**, **String** - `value`'s length is greater than or equal to `max`
 * @param {!Number} max - maximum length value
 * @example
 * max(3)('as') => true
 * max(3)('asd') => true
 * max(3)('asdf') => false
 */
export const max = max => {
  /**
   * @param {!(Array.<*>|String)} value - to be checked
   * @return {Boolean}
   */
  const validator = value => value.length <= max;
  return validator;
};
/**
 * For **Array**, **String** - `value` contains `validValue`
 * @param {*} validValue
 * @example
 * contain('test')('testA') => true
 * contain('test')('B test') => true
 * contain('test')([1, 'test'])) => true
 * contain('test')('asd') => false
 */
export const contain = validValue => {
  /**
   * @param {!(Array.<*>|String)} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return value ? value.indexOf(validValue) > -1 : false;
  };
  return validator;
};

/**
 * For **Array**, **String** - `value` contains `validValue`
 * @param {*} validValue
 * @example
 * notContain('test'))('testA') => false
 * notContain('test'))('B test') => false
 * notContain('test')([1, 'test'])) => false
 * notContain('test'))('asd') => true
 */
export const notContain = validValue => {
  /**
   * @param {!(Array.<*>|String)} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return value ? value.indexOf(validValue) === -1 : false;
  };
  return validator;
};
/**
 * For **String** - `value` is equal to `validValue`
 * @param {String} validValue
 * @example
 * like('test')('test') => true
 * like('test')('Test') => false
 * like('test')('asdasd') => false
 */
export const like = validValue => {
  /**
   * @param {String} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    if (!value && validValue) return false;
    if (value && !validValue) return false;
    if (!value && !validValue) return true;
    return value ? value.toString() === validValue.toString() : false;
  };
  return validator;
};

/**
 * For **String** - `value` is not equal to `validValue`
 * @param {String} validValue
 * @example
 * notLike('test')('asd') => true
 * notLike('test')('Test') => true
 * notLike('test')('test') => false
 */
export const notLike = validValue => {
  /**
   * @param {String} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    if (!value && validValue) return false;
    if (value && !validValue) return false;
    if (!value && !validValue) return true;
    return value ? value.toString() !== validValue.toString() : false;
  };
  return validator;
};

/**
 * For **Number** - `value` is equal to `validValue`
 * @param {!Number} validValue
 * @example
 * equal(2)(2) => true
 * equal(2)(22) => false
 * equal('test')('test') => false
 */
export const equal = validValue => {
  /**
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return Number(validValue) === Number(value);
  };
  return validator;
};
/**
 * For **Number** - `value` is not equal to `validValue`
 * @param {!Number} validValue
 * @example
 * notEqual(1)(2) => true
 * notEqual(1)(1) => false
 * notEqual('test')('test') => true
 * notEqual('test')('asdd') => true
 */
export const notEqual = validValue => {
  /**
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return Number(value) !== Number(validValue);
  };
  return validator;
};
/**
 * For **Number** - `value` is in range of `validValue`
 * @param {!Array.<Number>} validValue - as range array
 * @example
 * between([1, 4])(1) => true
 * between([1, 4])(4) => true
 * between([1, 4])(6) => false
 */
export const between = validValue => {
  /**
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => Number(validValue[0]) <= Number(value) && Number(validValue[1]) >= Number(value);
  return validator;
};

/**
 * For **Number** - `value` is not in range of `validValue`
 * @param {!Array.<Number>} validValue - as range array
 * @example
 * notBetween([1, 4])(1) => false
 * notBetween([1, 4])(2) => false
 * notBetween([1, 4])(4) => false
 * notBetween([1, 4])(6) => true
 */
export const notBetween = validValue => {
  /**
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => Number(validValue[0]) > Number(value) || Number(validValue[1]) < Number(value);
  return validator;
};
/**
 * For **Number, String** - `value` is in `validValue` array
 * @param {!Array.<*>} validValue
 * @example
 * inValues([1, 2, 3])(1) => true
 * inValues([1, 2, 3])(2) => true
 * inValues([1, 2, 3])(3) => true
 * inValues([1, 2, 3])(4) => false
 */
export const inValues = validValue => {
  /**
   * @param {*} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    if (!value) return false;
    const valuesIn = validValue.map(v => v.toString());
    return valuesIn.indexOf(value.toString()) > -1;
  };
  return validator;
};
/**
 * For **Number, String** - `value` is not in `validValue` array
 * @param {!Array.<*>} validValue
 * @example
 * notInValues([1, 2, 3])(4) => true
 * notInValues([1, 2, 3])(3) => false
 * notInValues([1, 2, 3])(2) => false
 * notInValues([1, 2, 3])(1) => false
 */
export const notInValues = validValue => {
  /**
   * @param {*} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    if (!value) return false;
    const valuesNotIn = validValue.map(v => v.toString());
    return valuesNotIn.indexOf(value.toString()) === -1;
  };
  return validator;
};
/**
 * For **Number** - `value` is greater than `validValue`
 * @param {!Number} validValue
 * @example
 * greaterThan(2)(12) => true
 * greaterThan(2)(2) => false
 * greaterThan(2)(1) => false
 */
export const greaterThan = validValue => {
  /**
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return Number(value) > Number(validValue);
  };
  return validator;
};
/**
 * For **Number** - `value` is greater than or equal to `validValue`
 * @param {!Number} validValue
 * @example
 * greaterThanOrEqual(2)(2) => true
 * greaterThanOrEqual(2)(12) => true
 * greaterThanOrEqual(2)(1) => false
 */
export const greaterThanOrEqual = validValue => {
  /**
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return Number(value) >= Number(validValue);
  };
  return validator;
};
/**
 * For **Number** - `value` is less than `validValue`
 * @param {!Number} validValue
 * @example
 * lessThan(2)(1) => true
 * lessThan(2)(0) => true
 * lessThan(2)(2) => false
 */
export const lessThan = validValue => {
  /**
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return Number(value) < Number(validValue);
  };
  return validator;
};
/**
 * For **Number** - `value` is less than or equal `validValue`
 * @param {!Number} validValue
 * @example
 * lessThanOrEqual(2)(2) => true
 * lessThanOrEqual(2)(1) => true
 * lessThanOrEqual(2)(22) => false
 */
export const lessThanOrEqual = validValue => {
  /**
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */ const validator = value => {
    return Number(value) <= Number(validValue);
  };
  return validator;
};
