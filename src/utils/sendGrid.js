// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require("@sendgrid/mail");
const { Config } = require("../config");

module.exports.setup = () => {
  sgMail.setApiKey(Config.secrets.sendGridApiKey);
};

/* Sends a verification link to a user given an email and the link. */
module.exports.sendVerificationEmail = async (email, verification_link) => {
  try {
    const msg = {
      to: email,
      from: {
        email: "noreply@flatten.ca",
        name: "The FLATTEN Team",
      },
      template_id: Config.authEmailTemplate,
      dynamic_template_data: {
        subject: "FLATTEN: Verify your email",
        verification_link,
      },
    };

    await sgMail.send(msg);
    return true;
  } catch (e) {
    console.log("Failed to send email.\n" + e);
    return false;
  }
};
