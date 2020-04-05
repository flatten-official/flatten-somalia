const { Datastore } = require("@google-cloud/datastore");

const { gstore } = require('./db');
const Account = require('../models/account');

const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const kms = require("../utils/kms");
const email = require("./emails");


class UserAccount {
  constructor() {
    this.entity = undefined;
  }

  createNewUser() {
      this.entity = new Account({}, data.user_id);
  }

  /* Append a token used for email verification to the history */
  setToken(token_id, expiry) {
    this.entity.tokens.push({
      'token_id': token_id,
      'timestamp': moment().valueOf(),
      'expiry': expiry
    })
  }

  setCookie(cookie_id) {
    this.entity.cookies.push({
      'cookie_id': cookie_id,
      'cookie_created': moment().valueOf(),
    })
  }

  /* Add a hash + peppered email to the user's list of emails */
  setEmail(hashed_email) {
    this.entity.email.push({
      'hash': hashed_email,
      'added': moment().valueOf(),
      'verified': false
    });
  }

  /* Query a user by ID and load it into this object.
  * Returns true upon a successful load, false if failed.  */
  async loadUserFromID(user_id) {
    let success = true;
    try {
      this.entity = await Account.get(user_id);
    } catch (e) {
      success = false;
    }
    return success;
  }

  async pushUser() {

    if (this.entity === undefined) {
      throw Error("Cannot push undefined Account entity");
    }

    await this.entity.save(null, {method: 'upsert'}).catch(console.error);
  }

  /* Query a user by cookie and load it into this object. Returns boolean flag indicating success. */
  async loadUserFromCookie(cookie) {
    try {
      this.entity = await Account.findOne({'cookies.cookie_id': cookie});
      return true;
    } catch {
      return false;
    }
  }

  /* Query a user by token and load it into this object */
  async loadUserFromToken(token) {
    try {
      this.entity = await Account.findOne({'tokens.token_id': token});
      return true;
    } catch {
      return false;
    }
  }

  /* Query a user by email and load it into this object */
  async loadUserFromEmail(email) {
    // TODO: hash the email
    try {
      this.entity = await Account.findOne({'email.hash': email});
      return true;
    } catch {
      return false;
    }
  }

}


// Encrypts the Ip address in data, storing the cypher text in a different field
async function encryptIp(data) {
  data.ip_encrypted = await kms.encrypt(
    process.env.SECRETS_KEYRING,
    process.env.IP_KEY,
    data.ip_address
  );
  delete data.ip_address; // deletes the existing plaintext ip address, if it exists
}

exports.insertForm = async (submission, hashedUserID) => {
  //Cookie Form handling
  if (!hashedUserID) {
    //User is not logged in, use cookie as before to store/update form
    const key = datastore.key({
      path: [process.env.DATASTORE_KIND, submission.cookie_id],
      namespace: process.env.DATASTORE_NAMESPACE
    });

    try {
      let data = { ...submission, history: [submission.form_responses] };
      // encrypt the ip of the submission using the cookie as the key
      await encryptIp(data);
      // Try to insert an object with cookie_id as key. If already submitted, fails
      const entity = {
        key,
        data: data
      };
      await datastore.insert(entity);
    } catch (e) {
      // If it already exists, update with new history
      let [data] = await datastore.get(key);

      data.history.push(submission.form_responses);
      data.form_responses = submission.form_responses;
      data.timestamp = submission.timestamp;
      data.at_risk = submission.at_risk;
      data.probable = submission.probable;
      // encrypt the ip of the submission using the cookie as the key, however this time we know that
      // the key already exists
      data.ip_address = submission.ip_address;
      await encryptIp(data);

      const entity = {
        key,
        data
      };
      const response = await datastore.update(entity);
    }
    return;
  }
  //End Cookie Form handling

  //Otherwise is logged in so proceed using the hashedUserID
  const key = datastore.key({
    path: [process.env.DATASTORE_KIND, hashedUserID],
    namespace: process.env.DATASTORE_NAMESPACE
  });

  try {
    // Try to insert an object with hashed userId as key. If already submitted, fails
    let data = { ...submission, history: [submission.form_responses] };
    await encryptIp(data);
    const entity = {
      key,
      data: data
    };
    await datastore.insert(entity);
  } catch (e) {
    // If it already exists, update with new history
    let [data] = await datastore.get(key);

    data.history.push(submission.form_responses);
    data.form_responses = submission.form_responses;
    data.timestamp = submission.timestamp;
    data.at_risk = submission.at_risk;
    data.probable = submission.probable;
    data.ip_address = submission.ip_address;
    await encryptIp(data);

    const entity = {
      key,
      data
    };
    const response = await datastore.update(entity);
  }
};

  // Migrates form submitted with cookie as a key to use google userID as a key
  exports.migrateCookieForm = async (hashedUserID, cookie_id, email) => {
  //userID is the hashed userID
  const cookieKey = datastore.key({
    path: [process.env.DATASTORE_KIND, cookie_id],
    namespace: process.env.DATASTORE_NAMESPACE
  });

  const userIDKey = datastore.key({
    path: [process.env.DATASTORE_KIND, hashedUserID],
    namespace: process.env.DATASTORE_NAMESPACE
  });

  //cookieKey Data
  const [cookieKeyData] = await datastore.get(cookieKey);
  if (!cookieKeyData) {
    // No cookieKey form exists;
    return;
  }

  await email.insertMarketingData(email, cookieKeyData.timestamp/1000.);

  // encrypt the IP in the cookie key data
  if (cookieKeyData.ip_encrypted === undefined) {
    // hash the ip with the new id
    await encryptIp(cookieKeyData);
  }

  delete cookieKeyData.cookie_id; //Deletes old cookie_id field, no longer needed as express-session cookies are used
  try {
    // Try to insert an object with userId as key. If already submitted, fails
    const newEntity = {
      key: userIDKey,
      data: cookieKeyData
    };
    await datastore.insert(newEntity);
  } catch (e) {
    // If it already exists, add cookie to the cookies array
    let [userIDKeyData] = await datastore.get(userIDKey);
    delete userIDKeyData.cookie_id;

    //Concat history to the existing one
    userIDKeyData.history = userIDKeyData.history.concat(cookieKeyData.history);
    const updatedEntity = {
      key: userIDKey,
      data: userIDKeyData
    };
    const response = await datastore.update(updatedEntity);
  }
  // Delete old cookieID entry
  await datastore.delete(cookieKey);
};
