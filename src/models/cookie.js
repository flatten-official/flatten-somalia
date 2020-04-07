const validator = require('validator');
const { v4: uuidv4 } = require("uuid");

// Module to handle cookies on the site
const userCookieMaxAge = 2 * 365 * 24 * 60 * 60 * 1000; // 2 years
const dailyCookieMaxAge = 12 * 60 * 60 * 1000; // 12h

user_options = {
  domain: process.env.DOMAIN,
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
  let userCookie = new UserCookie();
  if (cookieValue && !isOldCookie(cookieValue)) {
    // new schema cookie exists
    userCookie.parse(cookieValue);
  } else if (cookieValue) {
    // old cookie exists
    userCookie.migrateOldCookie(cookieValue);
  } else {
    // no cookie exists
    userCookie.setNewCookie(uuidv4(), 'a');
  }
  // if an email is supplied, and it has not already been verified
  if (email && !(userCookie.value.status === 'v')) {
    userCookie.setCookieStatus('e');
  }
  return [userCookie.getValue(), userCookie.value.id];
};

module.exports = {handleSubmit, user_options, daily_options, userCookieMaxAge, dailyCookieMaxAge};
