const express = require("express");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();

const secrets = require("./utils/secrets");
const kms = require("./utils/kms");
const hash = require("./utils/hash");

const googleData = require("./datastore/accounts");
const email = require("./datastore/emails");

const schema = require("./schema.js");

var recaptcha_secret = new secrets.Recaptcha();
var oauth_secret = new secrets.Secret(process.env.OAUTH_SECRET);
var pepper_secret = new kms.KMSSecret(
  process.env.PEPPER_KEY,
  process.env.PEPPER_FILE
);

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

  const submission = { ...schema.requestToSubmission(req), history: [] };

  try {
    var hashedEmail = await hash.hashPepper(
      submission.form_responses.email,
      pepper_secret
    );
  } catch (e) {
    // No email was given
  }

  console.log(hashedEmail);
  const cookie_id = req.signedCookies.userCookieValue
    ? req.signedCookies.userCookieValue
    : uuidv4();

  console.log(cookie_id);
  // If cookie exists
  try {
    if (req.signedCookies.userCookieValue) {
      await googleData.update(submission, cookie_id, hashedEmail);
    } else {
      await googleData.submitNew(submission, cookie_id, hashedEmail);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("error updating datastore");
    return;
  }

  const submission_cookie_options = {
    domain: process.env.DOMAIN,
    httpOnly: true,
    maxAge: 2 * 365 * 24 * 60 * 60 * 1000, // 2 years
    secure: true,
    signed: true,
  };
  res.cookie("userCookieValue", cookie_id, submission_cookie_options);
  res.status(200).send("Submit Success");
});

router.post("/login", async (req, res) => {
  //Include google token field and cookies to req body
  //Google Sign-In Token Verification
  let oauth_client_id = await oauth_secret.get();

  const client = new OAuth2Client(oauth_client_id);
  let userID = null;
  let userEmail = null;
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.body.tokenId,
      audience: oauth_client_id, // Specify the CLIENT_ID of the router that accesses the backend
    });
    const payload = ticket.getPayload();
    userID = payload["sub"]; //sub is the user's unique google ID
    userEmail = payload["email"]; //email is the user's email...
  }

  try {
    await verify();
  } catch {
    console.log("Login Token Error");
    res.status(400).send("Token not valid, login failed");
    return;
  }
  //End Token Verification

  //If cookie exists there may be a form associated w it
  const cookie_id = req.signedCookies.userCookieValue;

  try {
    var hashedUserID = hash.hashPepper(userID, pepper_secret);
    await googleData.insertForm(submission, hashedUserID);
  } catch (e) {
    res.status(400).send("Error inserting google data");
  }
  await googleData.migrateCookieForm(hashedUserID, cookie_id, userEmail);
  res.status(200).send(true);

  const data = { loginSuccess: true };
  res.status(200).json(data);
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
