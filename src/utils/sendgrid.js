// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const { Secret } = require("./secrets");
const sgMail = require("@sendgrid/mail");
const config = require("./../config");

const sg_secret = new Secret(process.env.SENDGRID_SECRET_ID);

/* Sends a verification link to a user given an email and the link. */
async function sendVerificationEmail(email, verification_link) {
  let api_key = await sg_secret.get();
  sgMail.setApiKey(api_key);
  const msg = {
    to: email,
    from: {
      email: "noreply@flatten.ca",
      name: "The FLATTEN Team",
    },
    template_id: config.verification_email_template,
    dynamic_template_data: {
      subject: "FLATTEN: Verify your email",
      verification_link,
    },
  };
  await sgMail.send(msg);
}

module.exports = { sendVerificationEmail };
