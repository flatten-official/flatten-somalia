const { verifyTokenAndMakeCookie } = require("../verificationAPI");
const { Config } = require("../../config");

// Verifies a token in the request and gives the user a cookie.
module.exports = async (req, res) => {
  const token = req.query.token;

  if (!token || typeof token !== "string") {
    res.status(400).send("No token included.");
    return;
  }

  const { id: cookieId, expiry } = await verifyTokenAndMakeCookie(token);

  if (!cookieId) {
    res
      .status(401)
      .send(
        "Your link is invalid (it might have expired)." +
          "Go to https://v.flatten.so to login again"
      );
    return;
  }

  res.cookie("id", cookieId, {
    expires: expiry,
    // secure cookies not wanted in dev environment
    secure: process.env.ENVIRONMENT !== "dev",
    signed: true,
    httpOnly: true,
    sameSite: "Lax",
  });

  res.redirect(303, Config.urls.homePage);
};
