const { readCookie } = require("../cookieData");
const { getPermissions } = require("../../volunteer/volunteerData");
const { authentication_url } = require("../../config");

/**
 * If cookie is invalid, redirects to the /auth page.
 * If cookie is valid, add volunteerId and permissions to res.locals for use by the endpoint.
 */
module.exports = async (req, res, next) => {
  const cookieID = req.signedCookies.id; // the cookie valuePromise

  if (!cookieID) {
    res.redirect(authentication_url);
    return;
  }

  const cookie = await readCookie(cookieID);

  if (!cookie) {
    res.redirect(authentication_url);
    return;
  }

  res.locals.permissions = await getPermissions(cookie.volunteerId);
  res.locals.volunteerId = cookie.volunteerId;

  next();
};
