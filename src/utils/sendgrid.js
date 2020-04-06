// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const secrets = require('./secrets');
const sgMail = require('@sendgrid/mail');

sg_secret = new secrets.Secret(process.env.SENDGRID_SECRET);

exports.sendVerificationEmail = async (email, verification_link) => {
  let api_key = await sg_secret.get();
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: 'noreply@flatten.ca',
    subject: 'Verify your email with flatten.ca!',
    // text: 'and easy to do anywhere, even with Node.js',
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    template_id: process.env.SG_TEMPLATE_ID,
    dynamic_template_data: {
      verification_link
    }
  };
  await sgMail.send(msg);
};
