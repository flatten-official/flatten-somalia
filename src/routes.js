const express = require("express");
const crypto = require("crypto");
const requestIp = require("request-ip");
const { v4: uuidv4 } = require("uuid");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();

const secrets = require("./utils/secrets");
const googleData = require("./datastore/accounts");

var recaptcha_secret = new secrets.Recaptcha();

const cookieMaxAge = 2 * 365 * 24 * 60 * 60 * 1000; // 2 years

// submit endpoint
router.post("/submit", async (req, res) => {
  // [
  //   recaptchaSuccess,
  //   recaptchaFailMessage,
  // ] = await recaptcha_secret.verifyRecaptcha(req.body.reactVerification);
  // if (!recaptchaSuccess) {
  //   res.status(400).send(recaptchaFailMessage);
  //   return;
  // }

  const ip = requestIp.getClientIp(req);
  const email = req.body.form_responses.email;
  delete req.body.form_responses.email;

  console.log(req.signedCookies.userCookieValue);
  console.log("email "+ email);

  const cookie_id = req.signedCookies.userCookieValue
    ? req.signedCookies.userCookieValue
    : uuidv4();

  console.log(`Have a cookie m8 ${cookie_id}`);

  try {
    await googleData.push(ip, req.body.form_responses, email, {id: cookie_id, maxAge: cookieMaxAge});
  } catch(e) {
    console.log(e);
    res.status(400).send("Error updating datastore");
    return;
  }

  const submission_cookie_options = {
    domain: process.env.DOMAIN,
    httpOnly: true,
    maxAge: cookieMaxAge,
    secure: true,
    signed: true,
  };
  res.cookie("userCookieValue", cookie_id, submission_cookie_options);
  res.status(200).send("Submit Success");
});

// determines if a cookie already exists
router.get("/read-cookie", (req, res) => {
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
