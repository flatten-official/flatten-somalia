const jwt = require("jsonwebtoken");
const { Secret } = require("./networkValues");

const jwtSecret = new Secret(process.env.JWT_SECRET_ID);

/**
 * @param jsonPayload json value
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
    console.log("Invalid token."); // TODO print different messaged if token is wrong vs if it's expired
    return null;
  }
};
