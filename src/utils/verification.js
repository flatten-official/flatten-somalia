const jwt = require("jsonwebtoken");

const { AccountService } = require('../datastore/accounts');

const { v4: uuidv4 } = require("uuid");

const secrets = require("./secrets");

const verificationTimeout = 60*60*6; // 6 hours

let jwt_secret = new secrets.Secret(process.env.JWT_SECRET);

/* Given an email and account, generate a token, and insert relevant properties into it and the account */
exports.generateAttachToken = async (account, email) => {
  let secret = await jwt_secret.get();

  let id = uuidv4();

  let exp = Math.round((Date.now()/1000) + verificationTimeout);

  let jwt_token = jwt.sign({
    email,
    id,
    exp
  }, secret);

  account.setToken(id, exp*1000);

  return jwt_token;
};

/* Given a token, find the user associated with it, if they exist */
exports.verifyTokenFetchAccount = async(token) => {
  let success;
  let account = new AccountService();
  let secret = await jwt_secret.get();

  let token_data;
  try {
    token_data = jwt.verify(token, secret);
  } catch (e) {
    console.log(e);
    return [false, undefined];
  }

  success = await account.loadUserFromToken(token_data.id);
  if (!success) {
    return [false, undefined];
  }

  account.removeToken(token.id);

  if (token_data.exp < Date.now()/1000) {
    return [false, undefined];
  }

  return [true, account];
};

