
const {generateToken} = require("../utils/formio");
const {sendVerificationEmail} = require("../utils/sendgrid");
const { loadConfig } = require("../utils/config");

const config = loadConfig();


module.exports = async (req, res) => {
  let email = req.query.email;

  let token = await generateToken(email, "somaliaVolunteer", "SomaliaVolunteer");

  let url = `http://${config.frontend_url}?token=${token}`

  await sendVerificationEmail(email, url);

  res
    .status(200)
    .send(`Flatten.so backend online (${process.env.ENVIRONMENT})`);
};
