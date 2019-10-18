export { precision, maxDistance } from './gisValidators';

/**
 * Checks whether a value is defined or not
 * @example
 * isDefined()(4) => true
 * isDefined()(null) => false
 * isDefined()('') => false
 */
export const isDefined = () => {
  /**
   * Returns `true` if `value` is not `undefined` or `null`.
   * @param {*} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    if (isBoolean()(value)) {
      return true;
    }
    if (isNumber()(value)) {
      return true;
    }
    if (isString()(value)) {
      return true;
    }
    return !!value;
  };
  return validator;
};
/**
 * For **Array**, **String** - checks whether value's length is greater than or equal to `validValue`
 * @param {!Number} validValue - minimum length value
 * @example
 * min(3)('as') => false
 * min(3)('asd') => true
 * min(3)('asdf') => true
 */
export const min = validValue => {
  /**
   * Returns `true` if `value`'s length is greater than or equal to `validValue`
   * @param {!(Array.<*>|String)} value - to be checked
   * @return {Boolean}
   */
  const validator = value => value.length >= validValue;
  return validator;
};
/**
 * For **Array**, **String** - checks whether value's length is greater than or equal to `validValue`
 * @param {!Number} validValue - maximum length value
 * @example
 * max(3)('as') => true
 * max(3)('asd') => true
 * max(3)('asdf') => false
 */
export const max = validValue => {
  /**
   * Returns `true` if `value`'s length is greater than or equal to `validValue`
   * @param {!(Array.<*>|String)} value - to be checked
   * @return {Boolean}
   */
  const validator = value => value.length <= validValue;
  return validator;
};
/**
 * For **Array**, **String** - checks whether a value contains `validValue`
 * @param {*} validValue
 * @example
 * contain('test')('testA') => true
 * contain('test')('B test') => true
 * contain('test')([1, 'test'])) => true
 * contain('test')('asd') => false
 */
export const contain = validValue => {
  /**
   * Returns `true` if `value` contains `validValue`
   * @param {!(Array.<*>|String)} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return value ? value.indexOf(validValue) > -1 : false;
  };
  return validator;
};

/**
 * For **Array**, **String** - checks whether a value deos not contain `validValue`
 * @param {*} validValue
 * @example
 * notContain('test'))('testA') => false
 * notContain('test'))('B test') => false
 * notContain('test')([1, 'test'])) => false
 * notContain('test'))('asd') => true
 */
export const notContain = validValue => {
  /**
   * Returns `true` if `value` deos not contain `validValue`
   * @param {!(Array.<*>|String)} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return value ? value.indexOf(validValue) === -1 : false;
  };
  return validator;
};
/**
 * For **String** - checks whether a value is equal to `validValue`
 * @param {String} validValue
 * @example
 * like('test')('test') => true
 * like('test')('Test') => false
 * like('test')('asdasd') => false
 */
export const like = validValue => {
  /**
   * Returns `true` if `value` is equal to `validValue`
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
 * For **String** - checks whether a value is not equal to `validValue`
 * @param {String} validValue
 * @example
 * notLike('test')('asd') => true
 * notLike('test')('Test') => true
 * notLike('test')('test') => false
 */
export const notLike = validValue => {
  /**
   * Returns `true` if `value` is not equal to `validValue`
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
 * For **Number** - checks whether a value is equal to `validValue`
 * @param {!Number} validValue
 * @example
 * equal(2)(2) => true
 * equal(2)(22) => false
 * equal('test')('test') => false
 */
export const equal = validValue => {
  /**
   * Returns `true` if `value` is equal to `validValue`
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return Number(validValue) === Number(value);
  };
  return validator;
};
/**
 * For **Number** - checks whether a value is not equal to `validValue`
 * @param {!Number} validValue
 * @example
 * notEqual(1)(2) => true
 * notEqual(1)(1) => false
 * notEqual('test')('test') => true
 * notEqual('test')('asdd') => true
 */
export const notEqual = validValue => {
  /**
   * Returns `true` if `value` is not equal to `validValue`
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return Number(value) !== Number(validValue);
  };
  return validator;
};
/**
 * For **Number** - checks whether a value is in the range of `validValue`
 * @param {!Array.<Number>} validValue - as range array
 * @example
 * between([1, 4])(1) => true
 * between([1, 4])(4) => true
 * between([1, 4])(6) => false
 */
export const between = validValue => {
  /**
   * Returns `true` if `value` is in range of `validValue`
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => Number(validValue[0]) <= Number(value) && Number(validValue[1]) >= Number(value);
  return validator;
};

/**
 * For **Number** - checks whether a value is not in the range of `validValue`
 * @param {!Array.<Number>} validValue - as range array
 * @example
 * notBetween([1, 4])(1) => false
 * notBetween([1, 4])(2) => false
 * notBetween([1, 4])(4) => false
 * notBetween([1, 4])(6) => true
 */
export const notBetween = validValue => {
  /**
   * Returns `true` if `value` is not in the range of `validValue`
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => Number(validValue[0]) > Number(value) || Number(validValue[1]) < Number(value);
  return validator;
};
/**
 * For **Number, String** - checks whether a value is in `validValue` array
 * @param {!Array.<*>} validValue
 * @example
 * inValues([1, 2, 3])(1) => true
 * inValues([1, 2, 3])(2) => true
 * inValues([1, 2, 3])(3) => true
 * inValues([1, 2, 3])(4) => false
 */
export const inValues = validValue => {
  /**
   * Returns `true` if `value` is in `validValue` array
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
 * For **Number, String** - checks whether a value is not in `validValue` array
 * @param {!Array.<*>} validValue
 * @example
 * notInValues([1, 2, 3])(4) => true
 * notInValues([1, 2, 3])(3) => false
 * notInValues([1, 2, 3])(2) => false
 * notInValues([1, 2, 3])(1) => false
 */
export const notInValues = validValue => {
  /**
   * Returns `true` if `value` is not in `validValue` array
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
 * For **Number** - checks whether a value is greater than `validValue`
 * @param {!Number} validValue
 * @example
 * greaterThan(2)(12) => true
 * greaterThan(2)(2) => false
 * greaterThan(2)(1) => false
 */
export const greaterThan = validValue => {
  /**
   * Returns `true` if `value` is greater than `validValue`
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return Number(value) > Number(validValue);
  };
  return validator;
};
/**
 * For **Number** - checks whether a value is greater than or equal to `validValue`
 * @param {!Number} validValue
 * @example
 * greaterThanOrEqual(2)(2) => true
 * greaterThanOrEqual(2)(12) => true
 * greaterThanOrEqual(2)(1) => false
 */
export const greaterThanOrEqual = validValue => {
  /**
   * Returns `true` if `value` is greater than or equal to `validValue`
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return Number(value) >= Number(validValue);
  };
  return validator;
};
/**
 * For **Number** - checks whether a value is less than `validValue`
 * @param {!Number} validValue
 * @example
 * lessThan(2)(1) => true
 * lessThan(2)(0) => true
 * lessThan(2)(2) => false
 */
export const lessThan = validValue => {
  /**
   * Returns `true` if `value` is less than `validValue`
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return Number(value) < Number(validValue);
  };
  return validator;
};
/**
 * For **Number** - checks whether a value is less than or equal to `validValue`
 * @param {!Number} validValue
 * @example
 * lessThanOrEqual(2)(2) => true
 * lessThanOrEqual(2)(1) => true
 * lessThanOrEqual(2)(22) => false
 */
export const lessThanOrEqual = validValue => {
  /**
   * Returns `true` if `value` is less than or equal to `validValue`
   * @param {!Number} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return Number(value) <= Number(validValue);
  };
  return validator;
};

/**
 * For **Any** - checks whether a value is from type `string`
 * @example
 * isString()('test') => true
 * isString()('2') => true
 * isString()('false') => true
 * isString()(false) => false
 * isString()(1) => false
 * isString()() => false
 */
export const isString = () => {
  /**
   * Returns `true` if `value` is from type `string`
   * @param {*} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return typeof value === 'string';
  };
  return validator;
};

/**
 * For **Any** - checks whether a value is an `array`
 * @example
 * isArray()([]) => true
 * isArray()(['2']) => true
 * isArray()(false) => false
 * isArray()(1) => false
 * isArray()({}) => false
 * isArray()() => false
 */
export const isArray = () => {
  /**
   * Returns `true` if `value` is an `array`
   * @param {*} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return {}.toString.call(value) === '[object Array]';
  };
  return validator;
};

/**
 * For **Any** - checks whether a value is from type `number`
 * @example
 * isNumber()(1) => true
 * isNumber()(-1) => true
 * isNumber()('1') => false
 * isNumber()() => false
 * isNumber()({}) => false
 * isNumber()(false) => false
 */
export const isNumber = () => {
  /**
   * Returns `true` if `value` is from type `number`
   * @param {*} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return typeof value === 'number' && !isNaN(value);
  };
  return validator;
};

/**
 * For **Any** - checks whether a value is an integer `number`
 * @example
 * isInteger()(1) => true
 * isInteger()(-1) => true
 * isInteger()(-2.3) => false
 * isInteger()(3.1415926536) => false
 * isInteger()({}) => false
 * isInteger()(false) => false
 */
export const isInteger = () => {
  /**
   * Returns `true` if `value` is an integer `number`
   * @param {*} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return isNumber()(value) && value % 1 === 0;
  };
  return validator;
};

/**
 * For **Any** - checks whether a value is from type `boolean`
 * @example
 * isBoolean()(true) => true
 * isBoolean()(false) => true
 * isBoolean()('true') => false
 * isBoolean()() => false
 */
export const isBoolean = () => {
  /**
   * Returns `true` if `value` is from type `boolean`
   * @param {*} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return typeof value === 'boolean';
  };
  return validator;
};

/**
 * For **Any** - checks whether a value is `function`
 * @example
 * isFunction()(a => a * a) => true
 * isFunction()(true) => false
 * isFunction()({}) => false
 */
export const isFunction = () => {
  /**
   * Рeturns `true` if `value` is `function`
   * @param {*} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    return typeof value === 'function';
  };
  return validator;
};
