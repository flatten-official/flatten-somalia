const jwt = require("jsonwebtoken");
const { getConfig } = require("../config");
const { getLogger } = require("../winston");

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
    getLogger().warning("Invalid token.", { error: e });
    return null;
  }
};
