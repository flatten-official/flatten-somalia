const express = require("express");
const requestIp = require("request-ip");
const { v4: uuidv4 } = require("uuid");
const { URL } = require("url");

const router = express.Router();

const secrets = require("./utils/secrets");
const googleData = require("./datastore/accounts");
const paperformData = require("./datastore/paperform");
const cookies = require("./models/cookie");
const verification = require("./utils/verification");
const sg = require("./utils/sendgrid");
const ipgeo = require("./utils/ipgeo");

var recaptcha_secret = new secrets.Recaptcha();
var paperform_secret = new secrets.Secret(process.env.PAPERFORM_SECRET);

const verify_path = "/verify";

// submit endpoint
router.post("/submit", async (req, res) => {
  console.log("Submit");
  [
    recaptchaSuccess,
    recaptchaFailMessage,
  ] = await recaptcha_secret.verifyRecaptcha(req.body.recaptchaVerification);
  if (!recaptchaSuccess) {
    res.status(400).send(recaptchaFailMessage);
    console.log("Recaptcha Failed");
    return;
  }

  const ip = requestIp.getClientIp(req);
  const email = req.body.email;
  const isFormSubmission = req.body.isFormSubmission;
  // delete values that we don't include in the submissions
  delete req.body.email;
  delete req.body.recaptchaVerification;
  delete req.body.isFormSubmission;
  console.log(`isFormSubmission: ${isFormSubmission} email ${email}`);

  let userCookie = cookies.handleSubmit(
    req.signedCookies.userCookieValue,
    email
  );
  console.log(
    `cookieValue: ${req.signedCookies.userCookieValue}, value ${JSON.stringify(
      userCookie.value
    )}`
  );

  let token_id = undefined;
  let token_expires = undefined;
  if (userCookie.value.status === "e" && !(email === undefined)) {
    console.log(`SendVerificationEmail`);
    let token;
    [token, token_id, token_expires] = await verification.generateToken(email);
    let verify_url = `https://api.${process.env.DOMAIN}${verify_path}?token=${token}`;
    await sg.sendVerificationEmail(email, verify_url).catch(() => {
      console.error("Issue sending verification email");
    });
  }

  try {
    // submission set to undefined if it is not a form submission
    let submission = isFormSubmission ? req.body : undefined;
    await googleData.push(
      { id: userCookie.value.id, maxAge: cookies.userCookieMaxAge },
      email,
      { token_id, token_expires },
      ip,
      submission
    );
  } catch (e) {
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
  res.send(
    cookies.handleRead(
      req.signedCookies.userCookieValue,
      req.signedCookies.dailyCookie
    )
  );
});
// determines if a cookie already exists

router.post("/set-daily-cookie", (req, res) => {
  let cookieValue;
  if (!req.signedCookies.dailyCookie) {
    cookieValue = uuidv4();
  } else {
    cookieValue = req.signedCookies.dailyCookie;
  }
  console.log(cookieValue);
  res.cookie("dailyCookie", cookieValue, cookies.daily_options);
  res.sendStatus(200);
});

router.post("/submit-paperform", async (req, res) => {
  let paperform_key = await paperform_secret.get();

  let key_verify_success = false;

  try {
    let key = req.body.data.filter((obj) => obj.custom_key === paperform_key);
    if (key.length === 1) {
      key_verify_success = true;
    }
  } catch (e) {
    console.error(e);
    console.log("Error verifying key");
  }

  if (!key_verify_success) {
    res.status(400).send("Error in verification");
    return;
  }

  req.body.data = req.body.data.filter(
    (obj) => !(obj.custom_key === paperform_key)
  );

  req.body.data = req.body.data.reduce(function (map, obj) {
    if (!obj.custom_key) {
      console.error(
        `Custom key not supplied for question: ${JSON.stringify(obj)}`
      );
      map[obj.key] = obj;
      return map;
    }
    map[obj.custom_key] = obj;
    return map;
  }, {});
  req.body.timestamp = Date.now();
  delete req.body.charge;

  await paperformData.pushPaperform(req.body);

  res.status(200).send("Form success");
});

router.get(verify_path, async (req, res) => {
  // verify the token in the datastore, and redirect the user to the frontend
  let account;
  let verifySuccess = false;
  try {
    [verifySuccess, account] = await verification.verifyTokenFetchAccount(
      req.query.token
    );
  } catch (e) {
    console.error(e);
  }

  if (!verifySuccess) {
    res
      .status(302)
      .send(
        "Looks like your verification link has already been used, or didn't exist in the first place..."
      );
    return;
  }

  let userCookie = cookies.handleVerify(req.signedCookies.userCookieValue);
  // set cookie for user
  account.setCookie(userCookie.value.id, Date.now() + cookies.userCookieMaxAge);
  await account.pushUser();
  // todo - investigate do we need to fiddle with cookie refresh options here?
  res.cookie("userCookieValue", userCookie.getValue(), cookies.user_options);

  res.setHeader("Location", `https://${process.env.DOMAIN}/`);
  res.status(302).send("Redirecting...");
});

router.get("/locale", async (req, res) => {
  let data = await ipgeo(requestIp.getClientIp(req));
  res.send(data);
});

// clears cookie
router.delete("/clear-cookie", (req, res) => {
  res.clearCookie("userCookieValue").send("success");
});

router.get("/", (req, res) => {
  res.status(200).send(`COVID-19 ${process.env.BACKEND_BRANCH} BACKEND ONLINE`);
});

module.exports = router;
