const { calculateExpiryTime } = require("./../utils/time");
const { writeCookie } = require("./cookieData");

const COOKIE_LIFE = 1080; // In minutes

/**
 *
 * @param tokenValue
 * @return a cookieID to pass to the user or null if
 */
async function verifyTokenAndMakeCookie(tokenValue) {
  // TODO Verify token
  const isValidToken = true;

  if (!isValidToken) return null;

  // TODO Read volunteerID from token
  const volunteerID = null;

  const cookieExpiry = calculateExpiryTime(COOKIE_LIFE);

  return await writeCookie(cookieExpiry, volunteerID);
}

module.exports = { verifyTokenAndMakeCookie };
