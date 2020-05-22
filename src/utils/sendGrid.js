// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const { buildSecret } = require("./networkValues");
const sgMail = require("@sendgrid/mail");
const Config = require("../config");

const apiKey = buildSecret(process.env.SENDGRID_SECRET_ID);

// sets sgMail. calling "await setupPromise" ensures setup has finished
const setupPromise = async () => sgMail.setApiKey(await apiKey.get());

/* Sends a verification link to a user given an email and the link. */
module.exports.sendVerificationEmail = async (email, verification_link) => {
  await setupPromise;

  const msg = {
    to: email,
    from: {
      email: "noreply@flatten.ca",
      name: "The FLATTEN Team",
    },
    template_id: Config.verification_email_template,
    dynamic_template_data: {
      subject: "FLATTEN: Verify your email",
      verification_link,
    },
  };

  await sgMail.send(msg);
};
