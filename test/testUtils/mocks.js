const { isEmail, isURL } = require("validator");

module.exports.sendVerificationEmail = (email, verification_link) => {
  return isEmail(email) && isURL(verification_link, { require_tld: false }); // require_tld to allow localhost
};
