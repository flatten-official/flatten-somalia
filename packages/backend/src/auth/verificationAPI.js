const { calculateExpiryTime } = require("../utils/time");
const { writeCookie } = require("./cookieData");
const { findVolunteerByEmail } = require("../volunteer/volunteerData");
const { verifyToken, signToken } = require("../utils/jwt");
const { sendVerificationEmail } = require("../utils/sendGrid");
const { getConfig } = require("util-config");
const { log } = require("util-logging");

const COOKIE_LIFE = 1080; // In minutes
const EMAIL_EXPIRY = 15; // In minutes

module.exports.verifyLoginAndSendEmail = async (emailAddress) => {
  const volunteer = await findVolunteerByEmail(emailAddress);

  if (!volunteer) {
    log.warning(`Invalid email: ${emailAddress}`);
    return; // Don't throw an API Error to not let user know if email was invalid to not allow guessing emails
  }

  const token = await signToken({ id: volunteer._id }, EMAIL_EXPIRY);

  const verificationLink =
    getConfig().urls.backendHost +
    getConfig().urls.emailLink +
    "?token=" +
    token;

  log.debug(verificationLink);

  await sendVerificationEmail(emailAddress, verificationLink);
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
