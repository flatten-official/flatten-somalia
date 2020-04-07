const { gstore } = require("./db");

const Account = require("../models/account");

const submissions = require("./submissions");
const validator = require('validator');

const kms = require("../utils/kms");
const hash = require("../utils/hash");

const {userCookieMaxAge} = require("../models/cookie");

const { v4: uuidv4 } = require("uuid");

const emailData = require("./emails");

var pepper_secret = new kms.KMSSecret(
  process.env.PEPPER_KEY,
  process.env.PEPPER_FILE
);


class AccountService {
  constructor() {
    this.entity = undefined;
  }

  createNewUser() {
    const data = {
      account_id: uuidv4(),
      cookies: [],
      tokens: [],
      email: [],
    };
    this.entity = new Account(data, data.account_id);
  }

  /* Append a token used for email verification to the history.
   * Value and expires are UTC Unix timestamps in milliseconds
   * */
  setToken(token_value, expires) {
    // revoke old tokens
    this.entity.tokens = this.entity.tokens.filter((t) => t.value === token_value);
    this.entity.tokens.push({
      value: token_value,
      created: Date.now(),
      expires: expires,
    });
  }

  /* Append a cookie */
  setCookie(cookie_value, expires) {
    var existing = this.entity.cookies.filter(obj => {
      return obj.value === cookie_value;
    })[0];
    if (existing === undefined) {
      this.entity.cookies.push({
        value: cookie_value,
        created: Date.now(),
        expires: expires
      });
    } else {
      this.entity.cookies.expires = expires;
    }
  }

  /* Add a hash + peppered email to the user's list of emails */
  async setEmail(email) {
    let hashedEmail = await hash.hashPepper(email, pepper_secret);
    for(let emailObj of this.entity.email) {
      if (hashedEmail === emailObj.hash) {
        return;
      }
    }
    this.entity.email.push({
      hash: hashedEmail,
      added: Date.now(),
      verified: false,
    });
  }

  async verifyEmail(email) {
    let hashedEmail = await hash.hashPepper(email, pepper_secret);
    for(let emailObj of this.entity.email) {
      if (hashedEmail === emailObj.hash) {
        emailObj.verified = true;
      }
    }
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

  static async queryByVerifiedEmail(email, excludeToken) {
    let hashedEmail = await hash.hashPepper(email, pepper_secret);
    let query = Account.query()
      .filter("email.hash", "=", hashedEmail);
    let {entities} = await query.run().catch(console.error);

    // filter for only verified users who do not have the excluded token
    entities = entities.filter(entity=> {
      let emailFiltered = entity.email.filter(obj=>(obj.hash===hashedEmail));
      let verified = emailFiltered[0].verified;

      let hasToken = false;
      for (let token_data of entity.tokens) {
        hasToken = hasToken || token_data.value === excludeToken;
      }
      return verified && !hasToken;

    });
    return entities;
  }

  /* Query a user by cookie and load it into this object. Returns boolean flag indicating success. */
  async loadUserFromCookie(cookie) {
    try {
      this.entity = await Account.findOne({ "cookies.value": cookie });
      return true;
    } catch {
      return false;
    }
  }

  /* Query a user by token and load it into this object */
  async loadUserFromToken(token_id) {
    try {
      this.entity = await Account.findOne({ "tokens.value": token_id });
      return true;
    } catch {
      return false;
    }
  }

  /* Remove a token associated with a user */
  removeToken(token_id) {
    this.entity.tokens = this.entity.tokens.filter((t) => t.value === token_id);
  }

  /* Query a user by email and load it into this object */
  async loadUserFromEmail(email) {
    let emailHash = await hash.hashPepper(email, pepper_secret);
    // TODO - look for whole list of results, search for *verified* emails
    // needed for when we start to do email stuff
    try {
      this.entity = await Account.findOne({ "email.hash": emailHash });
      return true;
    } catch {
      return false;
    }
  }
}

mergeVerifiedAccounts = async (email, currentAccount, currentAccountToken) => {
  let verifiedAccounts = await AccountService.queryByVerifiedEmail(email, currentAccountToken);
  verifiedAccounts.push(currentAccount.entity);
  currentAccount.createNewUser();
  // merge each property
  // TODO - refactor this stuff out into its own function
  currentAccount.entity.created = Math.min(...verifiedAccounts.map((a)=>a.created));
  currentAccount.entity.tokens = [].concat(...verifiedAccounts.map((a)=>a.tokens));
  currentAccount.entity.cookies = [].concat(...verifiedAccounts.map((a)=>a.cookies));
  let emails = [].concat(...verifiedAccounts.map((a)=>a.email));
  let emailTable = {};
  for (let emailData of emails) {
    let hash = emailData.hash;
    if (hash in emailTable) {
      emailTable[hash].added = Math.min(emailData.added, emailTable[hash].added);
      emailTable[hash].verified = emailData.verified || emailTable[hash].verified;
    } else {
      emailTable[hash] = emailData
    }
  }
  currentAccount.entity.email = Object.entries(emailTable).map(([k, v])=>v);
  currentAccount.entity.users["Primary"].form_responses = [].concat(...verifiedAccounts.map((a)=>a.users.Primary.form_responses)).sort(
    (res_a, res_b) => res_a < res_b ? 1 : 0
  );
  currentAccount.created = [].concat(...verifiedAccounts.map((a)=>a.tokens));

  let account_ids = verifiedAccounts.map((a)=>a.account_id);
  await Account.delete(account_ids);
  return currentAccount;
};

push = async (cookie, email, token, ip, submission) => {
  const account = new AccountService();
  let success = await account.loadUserFromCookie(cookie.id);
  if (!success) {
    account.createNewUser();
    account.setCookie(cookie.id, Date.now()+userCookieMaxAge);
  }
  if(!(email === undefined) && validator.isEmail(email)) {
    try {
      await account.setEmail(email);
    } catch (e) { /* No email was given */ }
    await emailData.insert(email);
  }

  if (!(token.token_id === undefined)) {
    account.setToken(token.token_id, token.token_expires);
  }

  if (!(submission===undefined)) {
    await submissions.submissionToAccount(account.entity.users, submission, ip);
  }

  await account.pushUser();

};

migrate = async (oldEntity) => {
  let account = new AccountService();
  account.createNewUser();
  await submissions.migrateOldUser(
    oldEntity,
    account.entity.users
  );

  if (!(oldEntity.cookie_id === undefined)) {
    // set expiry as now, because we don't actually know when it expires - we were not tracking this before...
    account.setCookie(oldEntity.cookie_id, Date.now());
  }
  await account.pushUser();
};

module.exports = {push, migrate, mergeVerifiedAccounts, AccountService};
