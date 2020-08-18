// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require("@sendgrid/mail");
const { getConfig } = require("util-config");
const { log } = require("util-logging");
const { ApiError } = require("./errors");

module.exports.setup = () => {
  sgMail.setApiKey(getConfig().secrets.sendGridApiKey);
};

/* Sends a verification link to a user given an email and the link. */
module.exports.sendVerificationEmail = async (email, verification_link) => {
  // Helpful when trying to log in when developing frontend
  // Necessary if we're mocking
  log.debug(`Verification link: ${verification_link}`);

  try {
    const msg = {
      to: email,
      from: {
        email: "noreply@flatten.ca",
        name: "The FLATTEN Team",
      },
      template_id: getConfig().authEmailTemplate,
      dynamic_template_data: {
        subject: "FLATTEN: Verify your email",
        verification_link,
      },
    };

    // Don't actually send email if we're supposed to mock
    if (!getConfig().mockSendGrid) await sgMail.send(msg);
  } catch (e) {
    log.error("Failed to send email.\n", { error: e });
    throw new ApiError("We were unable to send you an email.", 500);
  }
};
