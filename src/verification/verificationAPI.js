const { calculateExpiryTime } = require("./../utils/time");
const { writeCookie } = require("./cookieData");

const COOKIE_LIFE = 1080; // In minutes

/**
 * Verifies a token and generates
 * @param tokenValue
 * @return a cookieID to pass to the user or null if
 */
async function verifyTokenAndMakeCookie(tokenValue) {
  // TODO Verify that token is good and not expired
  const isValidToken = true;

  if (!isValidToken) return null;

  // TODO Read volunteerID from token
  const volunteerID = null;

  return await writeCookie(calculateExpiryTime(COOKIE_LIFE), volunteerID);
}

module.exports = { verifyTokenAndMakeCookie };
