const jwt = require("jsonwebtoken");
const { Config } = require("../config");

/**
 * @param jsonPayload json valuePromise
 * @param minTillExpiry in minutes
 */
module.exports.signToken = async (jsonPayload, minTillExpiry) => {
  return jwt.sign(jsonPayload, Config.secrets.jwtSecret, {
    expiresIn: minTillExpiry * 60,
  });
};

module.exports.verifyToken = async (token) => {
  try {
    return jwt.verify(token, Config.secrets.jwtSecret);
  } catch (e) {
    console.log("Invalid token." + e);
    return null;
  }
};
