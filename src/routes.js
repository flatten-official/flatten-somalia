const express = require("express");
const requestIp = require("request-ip");
const { v4: uuidv4 } = require("uuid");
const {URL} = require("url");

const router = express.Router();

const secrets = require("./utils/secrets");
const googleData = require("./datastore/accounts");
const cookies = require("./models/cookie");
const verification = require("./utils/verification");
const sg = require("./utils/sendgrid");

var recaptcha_secret = new secrets.Recaptcha();

const verify_path = "/verify";

// submit endpoint
router.post("/submit", async (req, res) => {
  [
    recaptchaSuccess,
    recaptchaFailMessage,
  ] = await recaptcha_secret.verifyRecaptcha(req.body.recaptchaVerification);
  if (!recaptchaSuccess) {
    res.status(400).send(recaptchaFailMessage);
    return;
  }

  const ip = requestIp.getClientIp(req);
  const email = req.body.email;
  const isFormSubmission = req.body.isFormSubmission;
  // delete values that we don't include in the submissions
  delete req.body.email;
  delete req.body.recaptchaVerification;
  delete req.body.isFormSubmission;

  let userCookie = cookies.handleSubmit(req.signedCookies.userCookieValue, email);

  let token_id = undefined;
  let token_expires = undefined;
  if (userCookie.value.status === "e" && !(email===undefined)) {
    let token;
    [token, token_id, token_expires] = await verification.generateToken(email);
    let verify_url = `https://api.${process.env.DOMAIN}${verify_path}?token=${token}`;
    await sg.sendVerificationEmail(email, verify_url).catch(() => {console.error("Issue sending verification email")});
  }

  try {
    // submission set to undefined if it is not a form submission
    let submission = isFormSubmission ? req.body: undefined;
    await googleData.push({id: userCookie.value.id, maxAge: cookies.userCookieMaxAge}, email, {token_id, token_expires}, ip, submission);
  } catch(e) {
    console.error(e);
    res.status(400).send("Error updating datastore");
    return;
  }

  // todo - investigate do we need to fiddle with cookie refresh options here?
  res.cookie("userCookieValue", userCookie.getValue(), cookies.user_options);
  if (isFormSubmission) {
    res.cookie("dailyCookie", uuidv4(), cookies.daily_options);
  }

  res.status(200).send("Submit Success");
});

// determines if a cookie already exists
router.get("/read-cookie", (req, res) => {
  res.send(cookies.handleRead(req.signedCookies.userCookieValue, req.signedCookies.dailyCookie));
});

router.get(verify_path, async (req, res) => {
  // verify the token in the datastore, and redirect the user to the frontend
  let account;
  let verifySuccess = false;
  try {
    [verifySuccess, account] = await verification.verifyTokenFetchAccount(req.query.token);
  } catch(e) {
    console.error(e);
  }

  if(!verifySuccess) {
    res.status(302).send("Looks like your verification link has already been used, or didn't exist in the first place...");
    return;
  }

  let userCookie = cookies.handleVerify(req.signedCookies.userCookieValue);
  // set cookie for user
  account.setCookie(userCookie.value.id, Date.now()+cookies.userCookieMaxAge);
  await account.pushUser();
  // todo - investigate do we need to fiddle with cookie refresh options here?
  res.cookie("userCookieValue", userCookie.getValue(), cookies.user_options);

  res.setHeader("Location", `https://${process.env.DOMAIN}/`);
  res.status(302).send("Redirecting...");

});

// clears cookie
router.delete("/clear-cookie", (req, res) => {
  res.clearCookie("userCookieValue").send("success");
});

router.get("/", (req, res) => {
  res.status(200).send(`COVID-19 ${process.env.BACKEND_BRANCH} BACKEND ONLINE`);
});

module.exports = router;
