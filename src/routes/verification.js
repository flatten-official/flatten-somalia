
const {generateToken, ProjectInfo} = require("../utils/formio");
const {sendVerificationEmail} = require("../utils/sendgrid");
const { loadConfig } = require("../utils/config");

const config = loadConfig();

module.exports = async (req, res) => {
  let email = req.query.email;

  let project_info = new ProjectInfo();

  
  let isAdmin = project_info.existsInResource(config.admin_resource, "email", email);
  let isUser = project_info.existsInResource(config.user_resource, "email", email);

  let token;
  if (isAdmin) {
    console.log("generating admin toke");
    token = await generateToken(email, config.admin_resource);
  } else if (isUser) {
    console.log("generating user toke");
    token = await generateToken(email, config.user_resource);
  } else {
    res.sendStatus(200);
    return;
  }

  let url = `http://${config.frontend_url}?token=${token}`
  console.log(email);
  await sendVerificationEmail(email, url);

  res.sendStatus(200);
};
