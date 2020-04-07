const validator = require('validator');
const { v4: uuidv4 } = require("uuid");

// Module to handle cookies on the site
const userCookieMaxAge = 2 * 365 * 24 * 60 * 60 * 1000; // 2 years
const dailyCookieMaxAge = 12 * 60 * 60 * 1000; // 12h

user_options = {
  // todo - test these cookie options to see if they work on the main and sub domain
  domain: `.${process.env.DOMAIN}`,
  httpOnly: true,
  maxAge: userCookieMaxAge,
  secure: true,
  signed: true,
};

daily_options = {
  domain: process.env.DOMAIN,
  httpOnly: true,
  maxAge: dailyCookieMaxAge,
  secure: true,
  signed: true,
};

class UserCookie {
  /* cookie status values:
   * 'a' - user has not yet entered an email, but has a cookie
   * 'e' - user has entered an email and has a cookie, but is not verified
   * 'v' - user has entered an email, has a cookie, and is verified
   *
   * New cookie value format:
   * "<cookie_id>|<cookie status value>"
   */

  constructor(cookieValue) {
    if (cookieValue && !isOldCookie(cookieValue)) {
      // new schema cookie exists
      this.parse(cookieValue);
    } else if (cookieValue) {
      // old cookie exists
      this.migrateOldCookie(cookieValue);
    } else {
      // no cookie exists
      this.setNewCookie(uuidv4(), 'a');
    }
  }

  setNewCookie(cookie_id, status) {
    this.value = {
      id: cookie_id,
      status
    };
  }

  setCookieStatus(status) {
    this.value.status = status
  }

  parseValue(cookie_value) {
    let cookie_arr = cookie_value.split('|');
    this.value = {
      id: cookie_arr[0],
      status: cookie_arr[1]
    }
  }

  getValue() {
    return `${this.value.id}|${this.value.status}`
  }

  migrateOldCookie(cookie_value) {
    this.value = {
      id: cookie_value,
      status: 'a'
    }
  }

}

isOldCookie = (cookie_value) => {
  return validator.isUUID(cookie_value)
};

handleSubmit = (cookieValue, email) => {
  let userCookie = new UserCookie(cookieValue);
  // if an email is supplied, and it has not already been verified
  if (email && !(userCookie.value.status === 'v')) {
    userCookie.setCookieStatus('e');
  }
  return userCookie;
};

handleRead = (userCookieValue, dailyCookieValue) => {
  let userCookie = new UserCookie(userCookieValue);
  let dailyCookie = new UserCookie(dailyCookieValue);
  return {
    user: {
      exists: !!userCookieValue,
      ...userCookie.value
    },
    daily: {
      exists: !!dailyCookieValue
    }
  };
};

handleVerify = (userCookieValue) => {
  let userCookie = new UserCookie(userCookieValue);
  userCookie.setCookieStatus('v');
  return userCookie;
};

module.exports = {handleSubmit, handleRead, handleVerify, user_options, daily_options, userCookieMaxAge, dailyCookieMaxAge};
