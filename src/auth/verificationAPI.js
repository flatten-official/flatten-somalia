const { calculateExpiryTime } = require("../utils/time");
const { writeCookie } = require("./cookieData");
const { findVolunteerIdByEmail } = require("../volunteer/volunteerData");
const { verifyToken, signToken } = require("../utils/jwt");
const { sendVerificationEmail } = require("../utils/sendGrid");
const { Config } = require("../config");

const COOKIE_LIFE = 1080; // In minutes
const EMAIL_EXPIRY = 15; // In minutes

module.exports.verifyLoginAndSendEmail = async (emailAddress) => {
  const volunteerId = await findVolunteerIdByEmail(emailAddress);

  if (!volunteerId) {
    console.log(`Invalid email: ${emailAddress}`);
    return true; // Return true to not let user know if email was invalid to not allow guessing emails
  }

  const token = await signToken({ id: volunteerId }, EMAIL_EXPIRY);

  const verificationLink = Config.urls.emailLink + "?token=" + token;

  return await sendVerificationEmail(emailAddress, verificationLink);
};

/**
 * Verifies a token and generates
 * @param tokenValue
 * @return a cookieID to pass to the user or null if
 */
module.exports.verifyTokenAndMakeCookie = async (tokenValue) => {
  const payload = await verifyToken(tokenValue);

  if (!payload) return null;

  const expiry = calculateExpiryTime(COOKIE_LIFE);
  return { id: await writeCookie(expiry, payload.id), expiry };
};
