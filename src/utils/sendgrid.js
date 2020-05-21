// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const { Secret } = require("./networkValues");
const sgMail = require("@sendgrid/mail");
const Config = require("./../config");

async function setup() {
  sgMail.setApiKey(await new Secret(process.env.SENDGRID_SECRET_ID).get());
}

const setupComplete = setup();

/* Sends a verification link to a user given an email and the link. */
async function sendVerificationEmail(email, verification_link) {
  await setupComplete;

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
}

module.exports = { sendVerificationEmail };
