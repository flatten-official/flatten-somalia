const jwt = require("jsonwebtoken");
const { getConfig } = require("util-config");
const { log } = require("util-logging");

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
    log.warning("Invalid token.", { error: e });
    return null;
  }
};
