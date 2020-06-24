const jwt = require("jsonwebtoken");
const { getConfig } = require("../config");

/**
 * @param jsonPayload json valuePromise
 * @param minTillExpiry in minutes
 */
module.exports.signToken = (jsonPayload, minTillExpiry) => {
  return jwt.sign(jsonPayload, getConfig().secrets.jwtSecret, {
    expiresIn: minTillExpiry * 60,
  });
};

module.exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, getConfig().secrets.jwtSecret);
  } catch (e) {
    console.log("Invalid token." + e);
    return null;
  }
};
