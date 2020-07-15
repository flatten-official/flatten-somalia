const { calculateExpiryTime } = require("../utils/time");
const { writeCookie } = require("./cookieData");
const {
  findVolunteerByEmail,
  Permissions,
} = require("../volunteer/volunteerData");
const { verifyToken, signToken } = require("../utils/jwt");
const { sendVerificationEmail } = require("../utils/sendGrid");
const { getConfig } = require("../config");
const { log } = require("../utils/winston");

const COOKIE_LIFE = 1080; // In minutes
const EMAIL_EXPIRY = 15; // In minutes

module.exports.verifyLoginAndSendEmail = async (emailAddress) => {
  const volunteer = await findVolunteerByEmail(emailAddress);

  if (!volunteer) {
    log.warning(`Invalid email: ${emailAddress}`);
    return true; // Return true to not let user know if email was invalid to not allow guessing emails
  }

  if (!volunteer.permissions.includes(Permissions.access)) {
    log.warning(
      `Volunteer (${emailAddress}) without access permission tried logging into system.`
    );
    return true; // Return true to not let user know if email was invalid to not allow guessing emails
  }

  const token = await signToken({ id: volunteer._id }, EMAIL_EXPIRY);

  const verificationLink =
    getConfig().urls.backendHost +
    getConfig().urls.emailLink +
    "?token=" +
    token;

  log.debug(verificationLink);

  return sendVerificationEmail(emailAddress, verificationLink);
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
