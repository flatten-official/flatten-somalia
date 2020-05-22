const { calculateExpiryTime } = require("../../utils/time");
const { verifyTokenAndMakeCookie } = require("../verificationAPI");
const { authentication_url } = require("../../config");

// Verifies a token in the request and gives the user a cookie.
module.exports = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    res.status(400).send("No token included.");
    return;
  }

  // TODO check if we need to check that token is string.

  const cookieId = await verifyTokenAndMakeCookie(token);

  if (!cookieId) {
    res.redirect(authentication_url);
    return;
  }

  res
    .cookie("id", cookieId, {
      expires: calculateExpiryTime(1080),
      secure: true,
      signed: true,
      httpOnly: true,
      sameSite: "Lax",
    })
    .redirect(process.env.FRONTEND_DOMAIN);
};
