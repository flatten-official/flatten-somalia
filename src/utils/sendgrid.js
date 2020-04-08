// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const secrets = require('./secrets');
const sgMail = require('@sendgrid/mail');

sg_secret = new secrets.Secret(process.env.SG_SECRET);

/* Sends a verification link to a user given an email and the link. */
sendVerificationEmail = async (email, verification_link) => {
  let api_key = await sg_secret.get();
  sgMail.setApiKey(api_key);
  const msg = {
    to: email,
    from: {
      email: 'noreply@flatten.ca',
      name: 'The FLATTEN Team'
    },
    template_id: process.env.SG_TEMPLATE_ID,
    dynamic_template_data: {
      subject: "FLATTEN: Verify your email",
      verification_link
    }
  };
  await sgMail.send(msg);
};


module.exports = {sendVerificationEmail};