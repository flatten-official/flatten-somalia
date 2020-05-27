const { verifyTokenAndMakeCookie } = require("../verificationAPI");
const { Config } = require("../../config");

// Verifies a token in the request and gives the user a cookie.
module.exports = async (req, res) => {
  const token = req.query.token;

  if (!token || typeof token !== "string") {
    res.status(400).send("No token included.");
    return;
  }

  const tokenContent = await verifyTokenAndMakeCookie(token);

  if (!tokenContent) {
    res
      .status(401)
      .send(
        "Your link is invalid (it might have expired)." +
          "Go to https://v.flatten.org to login again"
      );
    return;
  }

  res.cookie("id", tokenContent.id, {
    expires: tokenContent.expiry,
    // secure cookies not wanted in dev environment
    secure: process.env.ENVIRONMENT !== "dev",
    signed: true,
    httpOnly: true,
    sameSite: "Lax",
  });

  res.redirect(303, Config.urls.homePage);
};
