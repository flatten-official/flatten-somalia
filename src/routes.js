const express = require("express");
const crypto = require("crypto");
const requestIp = require("request-ip");
const { v4: uuidv4 } = require("uuid");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();

const secrets = require("./utils/secrets");
const googleData = require("./datastore/accounts");
const cookies = require("./models/cookie");

var recaptcha_secret = new secrets.Recaptcha();

// submit endpoint
router.post("/submit", async (req, res) => {
  [
    recaptchaSuccess,
    recaptchaFailMessage,
  ] = await recaptcha_secret.verifyRecaptcha(req.body.reactVerification);
  if (!recaptchaSuccess) {
    res.status(400).send(recaptchaFailMessage);
    return;
  }

  const ip = requestIp.getClientIp(req);
  const email = req.body.form_responses.email;
  delete req.body.form_responses.email;

  let [cookie_value, cookie_id] = cookies.handleSubmit(req.signedCookies.userCookieValue, email);

  try {
    await googleData.push(ip, req.body.form_responses, email, {id: cookie_id, maxAge: cookies.userCookieMaxAge});
  } catch(e) {
    console.error(e);
    res.status(400).send("Error updating datastore");
    return;
  }

  res.cookie("userCookieValue", cookie_value, cookies.user_options);
  res.cookie("dailyCookie", uuidv4(), cookies.daily_options);
  res.status(200).send("Submit Success");
});

// determines if a cookie already exists
router.get("/read-cookie", (req, res) => {
  // todo - convert format of cookie
  const exists = req.signedCookies.userCookieValue ? true : false;
  res.send({ exists });
});

// clears cookie
router.delete("/clear-cookie", (req, res) => {
  res.clearCookie("userCookieValue").send("success");
});

router.get("/", (req, res) => {
  res.status(200).send(`COVID-19 ${process.env.BACKEND_BRANCH} BACKEND ONLINE`);
});

module.exports = router;
