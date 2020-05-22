const jwt = require("jsonwebtoken");
const { buildSecret } = require("./networkValues");

const jwtSecret = buildSecret(process.env.JWT_SECRET_ID);

/**
 * @param jsonPayload json valuePromise
 * @param minTillExpiry in minutes
 */
module.exports.signToken = async (jsonPayload, minTillExpiry) => {
  return jwt.sign(jsonPayload, await jwtSecret.get(), {
    expiresIn: minTillExpiry * 60000,
  });
};

module.exports.verifyToken = async (token) => {
  try {
    return jwt.verify(token, await jwtSecret.get());
  } catch (e) {
    console.log("Invalid token." + e);
    return null;
  }
};
