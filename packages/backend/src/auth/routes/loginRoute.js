const { log } = require("util-logging");
const { verifyLoginAndSendEmail } = require("../verificationAPI");
const { isEmail } = require("validator");

// Performs the appropriate actions to log in a user.
module.exports = async (req, res) => {
  const emailAddress = req.body.email;

  if (!emailAddress) {
    res.status(400).send("No email specified.");
    log.warning("Failed due to missing email.", { status: 400 });
    return;
  }

  if (typeof emailAddress !== "string" || !isEmail(emailAddress)) {
    res.status(422).send("Invalid email.");
    log.warning("Failed due to invalid email.", { status: 422 });
    return;
  }

  await verifyLoginAndSendEmail(emailAddress); // Returns true even if email was wrong

  res.sendStatus(200);
  log.info("Successfully sent login email or email invalid.", {
    status: 200,
  });
};
