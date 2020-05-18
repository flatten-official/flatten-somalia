const { generateToken, formIoApi } = require("../utils/formio");
const { sendVerificationEmail } = require("../utils/sendgrid");
const Config = require("./../config");

module.exports = async (req, res) => {
  let email = req.query.email;

  if (!email) {
    res.status(400).send("No email provided.");
    return;
  }

  const isAdmin = formIoApi.existsInResource(
    Config.admin_resource,
    "email",
    email
  );

  const isUser = formIoApi.existsInResource(
    Config.user_resource,
    "email",
    email
  );

  let token;

  if (isAdmin) {
    console.log("admin resource ", Config.admin_resource);
    token = await generateToken(
      email,
      Config.admin_resource,
      Config.admin_role
    );
  } else if (isUser) {
    token = await generateToken(email, Config.user_resource, Config.user_role);
  } else {
    res.sendStatus(200);
    return;
  }

  const url = `${process.env.FRONTEND_URL}?token=${token}`;
  await sendVerificationEmail(email, url); // TODO do we need to await email sending or can we return success

  res.sendStatus(200);
};
