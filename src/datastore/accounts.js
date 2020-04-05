const { Datastore } = require("@google-cloud/datastore");

const { gstore } = require("./db");

const Account = require("../models/account");

const submissions = require("./submissions");

const { v4: uuidv4 } = require("uuid");

const kms = require("../utils/kms");
const email = require("./emails");

class AccountService {
  constructor() {
    this.entity = undefined;
  }

  createNewUser() {
    const data = {
      account_id: uuidv4(),
    };
    this.entity = new Account(data, data.account_id);
  }

  /* Append a token used for email verification to the history.
   * Value and expires are UTC Unix timestamps in milliseconds
   * */
  setToken(token_value, expires) {
    this.entity.tokens.push({
      value: token_value,
      created: Date.now(),
      expires: expires,
    });
  }

  /* Append a cookie */
  setCookie(cookie_value, expires) {
    this.entity.cookies.push({
      value: cookie_value,
      created: Date.now(),
      expires: expires,
    });
  }

  /* Add a hash + peppered email to the user's list of emails */
  setEmail(hashed_email) {
    this.entity.email.push({
      hash: hashed_email,
      added: Date.now(),
      verified: false,
    });
  }

  async submit(cookie, form_responses, ip) {
    var success = this.loadUserFromCookie();
    if (success) {
      // TODO
    } else {
      // try to load by email, allow if verified
      // TODO

      // if this does not work
      this.createNewUser();
    }
  }

  async migrateOldUser(oldEntity) {
    this.createNewUser();
    this.entity.users = submissions.migrateOldUser(
      oldEntity,
      this.entity.users
    );

    if (!(oldEntity.cookie_id === undefined)) {
      // set expiry as now, because we don't actually know when it expires - we were not tracking this before...
      this.setCookie(oldEntity.cookie_id, Date.now());
    }
    this.pushUser();
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

    await this.entity.save(null, { method: "upsert" }).catch(console.error);
  }

  /* Query a user by cookie and load it into this object. Returns boolean flag indicating success. */
  async loadUserFromCookie(cookie) {
    try {
      console.log("it worked");

      this.entity = await Account.findOne({ "cookies.cookie_id": cookie });
      return true;
    } catch {
      console.log(":(((((((");

      return false;
    }
  }

  /* Query a user by token and load it into this object */
  async loadUserFromToken(token) {
    try {
      this.entity = await Account.findOne({ "tokens.token_id": token });
      return true;
    } catch {
      return false;
    }
  }

  /* Query a user by email and load it into this object */
  async loadUserFromEmail(email) {
    // TODO: hash the email
    try {
      this.entity = await Account.findOne({ "email.hash": email });
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

exports.update = async (submission, cookieID, hashedEmail) => {
  const User = new AccountService();
  await User.loadUserFromCookie(cookieID);
  User.setEmail(hashedEmail);

  let data = User.entity.user_responses.Primary;
  data.history.push(submission.form_responses);
  data.form_responses = submission.form_responses;
  data.timestamp = submission.timestamp;
  data.at_risk = submission.at_risk;
  data.probable = submission.probable;
  data.ip_address = submission.ip_address;
  const Primary = { ...data };

  User.entity.user_responses = { Primary };
  User.pushUser();
};

exports.submitNew = async (submission, cookieID, hashedEmail) => {
  const User = new AccountService();
  User.createNewUser();
  // await encryptIp(submission);
  const Primary = { ...submission, history: [submission.form_responses] };
  User.entity.user_responses = { Primary };
  User.setCookie(cookieID, Date.now() + 2 * 365 * 24 * 60 * 60 * 1000);
  User.setEmail(hashedEmail);
  User.pushUser();
};

// Migrates form submitted with cookie as a key to use google userID as a key
exports.migrateCookieForm = async (hashedUserID, cookie_id, email) => {
  //userID is the hashed userID
  const cookieKey = datastore.key({
    path: [process.env.DATASTORE_KIND, cookie_id],
    namespace: process.env.DATASTORE_NAMESPACE,
  });

  const userIDKey = datastore.key({
    path: [process.env.DATASTORE_KIND, hashedUserID],
    namespace: process.env.DATASTORE_NAMESPACE,
  });

  //cookieKey Data
  const [cookieKeyData] = await datastore.get(cookieKey);
  if (!cookieKeyData) {
    // No cookieKey form exists;
    return;
  }

  await email.insertEmailData(email);

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
      data: cookieKeyData,
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
      data: userIDKeyData,
    };
    const response = await datastore.update(updatedEntity);
  }
  // Delete old cookieID entry
  await datastore.delete(cookieKey);
};
