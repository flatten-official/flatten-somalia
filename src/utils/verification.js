const jwt = require("jsonwebtoken");

const { AccountService } = require('../datastore/accounts');

const { v4: uuidv4 } = require("uuid");

const secrets = require("./secrets");

const verificationTimeout = 60*60*6; // 6 hours

let jwt_secret = new secrets.Secret(process.env.JWT_SECRET);

/* Given an email generate a token */
exports.generateToken = async (email) => {
  let secret = await jwt_secret.get();

  let jwtid = uuidv4();

  let exp = Math.round((Date.now()/1000) + verificationTimeout);

  let token = jwt.sign({
    email,
    exp
  }, secret, {
    jwtid
  });

  return [token, jwtid, exp*1000];
};

/* Given a token, find the user associated with it, if they exist */
exports.verifyTokenFetchAccount = async(token) => {
  let success;
  let account = new AccountService();
  let secret = await jwt_secret.get();

  var token_data;
  try {
    token_data = jwt.verify(token, secret);
  } catch (e) {
    console.log(e);
    return [false, undefined];
  }

  success = await account.loadUserFromToken(token_data.jti);
  if (!success) {
    console.log("Error loading user from token");
    return [false, undefined];
  }

  account.removeToken(token_data.id);

  await account.verifyEmail(token_data.email);

  if (token_data.exp < Date.now()/1000) {
    return [false, undefined];
  }

  return [true, account];
};

