const { calculateExpiryTime } = require("../../utils/time");
const { verifyTokenAndMakeCookie } = require("../verificationAPI");
const { authentication_url } = require("../../config");

// Verifies a token in the request and gives the user a cookie.
module.exports = async (req, res) => {
  const token = req.query.token;

  if (!token || typeof token !== "string") {
    res.status(400).send("No token included.");
    return;
  }

  const cookieId = await verifyTokenAndMakeCookie(token);

  if (!cookieId) {
    res
      .status(401)
      .send(
        "Your link is invalid (it might have expired)." +
          "Go to https://v.flatten.so to login again"
      );
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
    .redirect(303, process.env.FRONTEND_DOMAIN);
};
