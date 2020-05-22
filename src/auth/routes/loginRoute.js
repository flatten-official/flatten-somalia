const { verifyLogin } = require("../verificationAPI");
const { isEmail } = require("validator");

// Performs the appropriate actions to log in a user.
module.exports = async (req, res) => {
  const emailAddress = req.body.email;

  if (!emailAddress) {
    res.status(400).send("No email specified.");
    return;
  }

  if (typeof emailAddress !== "string" || !isEmail(emailAddress)) {
    res.status(422).send("Invalid email.");
    return;
  }

  await verifyLogin(emailAddress);

  res.sendStatus(200);
};
