const jwt = require("jsonwebtoken");
const { getConfig } = require("../config");

/**
 * @param jsonPayload json valuePromise
 * @param minTillExpiry in minutes
 */
module.exports.signToken = async (jsonPayload, minTillExpiry) => {
  return jwt.sign(jsonPayload, getConfig().secrets.jwtSecret, {
    expiresIn: minTillExpiry * 60,
  });
};

module.exports.verifyToken = async (token) => {
  try {
    return jwt.verify(token, getConfig().secrets.jwtSecret);
  } catch (e) {
    console.log("Invalid token." + e);
    return null;
  }
};
