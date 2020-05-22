const { calculateExpiryTime } = require("./../utils/time");
const { writeCookie } = require("./cookieData");
const { findVolunteerIdByEmail } = require("./../volunteer/volunteerData");
const { verifyToken, signToken } = require("./../utils/jwt");
const { sendVerificationEmail } = require("../utils/sendGrid");

const COOKIE_LIFE = 1080; // In minutes

module.exports.verifyLogin = async (emailAddress) => {
  const volunteerId = await findVolunteerIdByEmail(emailAddress);

  if (!volunteerId) {
    console.log(`Invalid email: ${emailAddress}`);
    return;
  }

  const token = await signToken({ id: volunteerId }, 15);

  const verificationLink =
    process.env.BACKEND_URL + "/verify/token?token=" + token;

  await sendVerificationEmail(emailAddress, verificationLink);
};

/**
 * Verifies a token and generates
 * @param tokenValue
 * @return a cookieID to pass to the user or null if
 */
module.exports.verifyTokenAndMakeCookie = async (tokenValue) => {
  // TODO Verify that token is good and not expired
  const payload = await verifyToken(tokenValue);

  if (!payload) return null;

  return await writeCookie(calculateExpiryTime(COOKIE_LIFE), payload.id);
};
