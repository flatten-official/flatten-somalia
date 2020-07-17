/**
 * Returns a Date object that is a certain number of minutes past the current time.
 */
module.exports.calculateExpiryTime = (minutes) => {
  return new Date(Date.now() + minutes * 60000);
};
