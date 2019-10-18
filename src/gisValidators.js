import { lessThanOrEqual } from './validators';
import { getDistance, degreesToMeters } from './math';

/**
 * For **Location** object - checks whether a value is more precise than `validValue`
 * @param {Number} validValue - accuracy in meters
 * @example
 * precision(10)({ accuracy: 4 }) => true
 * precision(10)({ accuracy: 12 }) => false
 * precision(10)({ coords: { accuracy: 4 }}) => true
 * precision(10)({ coords: { accuracy: 12 }}) => false
 */
export const precision = validValue => {
  /**
   * Returns `true` if `value` is more precise than `validValue`
   * @param {!Object} value - location object, returned by the GPS
   * ```
   * [value.accuracy] - accuracy in meters
   * [value.coords] - coords object returned by the GPS
   * [value.coords.accuracy] - accuracy in meters
   * ```
   * @return {Boolean}
   */
  const validator = value => {
    const coords = value.coords || value;
    return coords.accuracy <= validValue;
  };
  return validator;
};
/**
 * For **Coordinates** - distance between `p1` and `p2` is less than or equal to `validValue`
 * @param {!Number} validValue
 * @example
 * maxDistance(100)([325763.7233, 450358.7089], [325758.0054, 450367.7143]) => true
 * maxDistance(100)([42.678748, 23.338703], [42.678803, 23.338928], true) => true
 * maxDistance(100)([325763.7233, 450358.7089], [325724.1967, 450516.2508]) => false
 */
export const maxDistance = validValue => {
  const validator = lessThanOrEqual(validValue);
  /**
   * @param {!Array.<Number>} p1 - coordinates of first point in format `[lon, lat]`, `[e, n]`, `[x, y]`
   * @param {!Array.<Number>} p2 - coordinates of second point in format `[lon, lat]`, `[e, n]`, `[x, y]`
   * @param {Boolean} [useDegrees] - if `true` the distance will be calculated in decimal degrees and then
   * converted to meters, using the average latitude as a reference parallel
   */
  const validatorFunction = (p1, p2, useDegrees = false) => {
    let distance = getDistance(p1, p2);
    if (useDegrees) {
      const midLatitude = (p1[1] + p2[1]) / 2;
      distance = degreesToMeters(distance, midLatitude);
    }
    return validator(distance);
  };
  return validatorFunction;
};
/**
 * For **Number, String** - checks whether a value is present in `validValue` domain members.
 * This will check only `code` property, you can use `valueInDomain()` to search for values.
 * @param {!Array.<*>} domainItems
 * @example
 * codeInDomain([
 *    { code: 1, name: '0.4 kV' },
 *    { code: 2, name: '10 kV' },
 *    { code: 3, name: '20 kV' },
 *    { code: 4, name: '220 kV' }
 * ])(2) => true
 * codeInDomain([
 *    { code: 1, name: '0.4 kV' },
 *    { code: 2, name: '10 kV' },
 *    { code: 3, name: '20 kV' },
 *    { code: 4, name: '220 kV' }
 * ])(123) => false
 */
export const codeInDomain = domainItems => {
  /**
   * Returns `true` if `value` is present in `validValue` domain members as a code
   * @param {*} value - to be checked
   * @return {Boolean}
   */
  const validator = value => {
    if (!value) return false;
    return domainItems.findIndex(({ code }) => value === code) > -1;
  };
  return validator;
};
/**
 * For **Number, String** - checks whether a value is present in `validValue` domain members.
 * This will check `name` (used by ESRI domains) or `value` property, you can use `codeInDomain()` to search for codes.
 * @param {!Array.<*>} domainItems
 * @example
 * valueInDomain([
 *    { code: 1, name: '0.4 kV' },
 *    { code: 2, name: '10 kV' },
 *    { code: 3, name: '20 kV' },
 *    { code: 4, name: '220 kV' }
 * ])('220 kV') => true
 * valueInDomain([
 *    { code: 1, name: '0.4 kV' },
 *    { code: 2, name: '10 kV' },
 *    { code: 3, name: '20 kV' },
 *    { code: 4, name: '220 kV' }
 * ])('test') => false
 */
export const valueInDomain = domainItems => {
  /**
   * Returns `true` if `value` is present in `validValue` domain members as a value
   * @param {*} value - to be checked
   * @return {Boolean}
   */
  const validator = testedValue => {
    if (!testedValue) return false;
    return domainItems.findIndex(({ name, value }) => testedValue === (name || value)) > -1;
  };
  return validator;
};
