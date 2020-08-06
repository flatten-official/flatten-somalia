const { calculateExpiryTime } = require("../utils/time");
const { writeCookie, deleteCookiesForVolunteer } = require("./cookieData");
const {
  findVolunteerByEmail,
  Permissions,
} = require("../volunteer/volunteerData");
const { verifyToken, signToken } = require("../utils/jwt");
const { sendVerificationEmail } = require("../utils/sendGrid");
const { getConfig } = require("util-config");
const { log } = require("util-logging");
const { ApiError } = require("../utils/errors");

const COOKIE_LIFE = 1080; // In minutes
const EMAIL_EXPIRY = 15; // In minutes

module.exports.verifyLoginAndSendEmail = async (emailAddress) => {
  const volunteer = await findVolunteerByEmail(emailAddress);

  if (!volunteer) {
    log.warning(`Invalid email: ${emailAddress}`);
    return; // Don't throw an API Error to not let user know if email was invalid to not allow guessing emails
  }

  if (!volunteer.permissions.includes(Permissions.access)) {
    log.warning(
      `Volunteer (${emailAddress}) without access permission tried logging into system.`
    );
    return; // Don't throw an API Error to not let user know he doesn't have access to not allow guessing emails
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

  if (!payload) {
    log.info("Failed to verify token & issue cookie.", { status: 410 });
    throw new ApiError(
      "Your link is invalid (it might have expired)." +
        "Go to https://v.flatten.org to login again",
      401
    );
  }

  const deletedCookiesCount = await deleteCookiesForVolunteer(payload.id); // Delete any previous cookies for the volunteer effectively logging them out on other devices
  if (deletedCookiesCount > 0)
    log.warning(
      `Volunteer ${payload.id} was logged out of ${deletedCookiesCount} browser(s).`
    );

  const expiry = calculateExpiryTime(COOKIE_LIFE);
  return { id: await writeCookie(expiry, payload.id), expiry };
};
