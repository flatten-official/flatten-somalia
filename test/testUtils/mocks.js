const { isEmail, isURL } = require("validator");

module.exports.sendVerificationEmail = (email, verificationLink) => {
  return isEmail(email) && isURL(verificationLink, { require_tld: false }); // require_tld to allow localhost
};
