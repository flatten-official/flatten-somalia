/**
 * Returns a Date object that is a certain number of minutes past the current time.
 */
function calculateExpiryTime(minutes) {
  return new Date(Date.now() + minutes * 60000);
}

module.exports = { calculateExpiryTime };
