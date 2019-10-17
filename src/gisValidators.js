import { lessThanOrEqual } from './validators';
import { getDistance, degreesToMeters } from './math';

/**
 * For **Coordinates** - distance between `p1` and `p2` is less than or equal to `validValue`
 * @param {!Number} validValue
 * @example
 * getValidator({ maxDistance: 100 })([325763.7233, 450358.7089], [325758.0054, 450367.7143]) => true
 * getValidator({ maxDistance: 100 })([42.678748, 23.338703], [42.678803, 23.338928], true) => true
 * getValidator({ maxDistance: 100 })([325763.7233, 450358.7089], [325724.1967, 450516.2508]) => false
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
