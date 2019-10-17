/**
 * Convert a value from radians to degrees.
 * @param {!Number} radians - value in radians
 * @return {Number}
 */
export const toDegrees = radians => {
  return radians * (180 / Math.PI);
};
/**
 * Conver a value from degrees to radians.
 * @param {!Number} degrees - value in decimal degrees
 * @return {Number}
 */
export const toRadians = degrees => {
  return degrees * (Math.PI / 180);
};

/**
 * Calculates the Eucledian distance between two points.
 * @param {!Array.<Number>} p1
 * @param {!Array.<Number>} p2
 * @return {Number}
 */
export const getDistance = (p1, p2) => {
  const dx = p2[0] - p1[0],
    dy = p2[1] - p1[1];
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Convert distance from meters to decimal degrees
 * @public
 * @param {!Number} meters - distance in meters
 * @param {Number} [latitude=0] - current latitude, default is 0 - the equator
 * @return {Number}
 */
export const metersToDegrees = (meters, latitude = 0) => {
  return meters / (111.32 * 1000 * Math.cos(toRadians(latitude)));
};

/**
 * Convert distance from decimal degrees to meters
 * @public
 * @param {!Number} degrees - distance in decimal degrees
 * @param {Number} [latitude=0] - latitude of the reference parallel, default is 0 - the equator
 * @return {Number}
 */
export const degreesToMeters = (degrees, latitude = 0) => {
  return degrees * (111.32 * 1000 * Math.cos(toRadians(latitude)));
};
