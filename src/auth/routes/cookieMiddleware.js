const { readCookie } = require("../cookieData");
const { getVolunteer } = require("../../volunteer/volunteerData");

/**
 * If cookie is invalid, redirects to the /auth page.
 * If cookie is valid, add volunteerId and permissions to res.locals for use by the endpoint.
 */
module.exports = async (req, res, next) => {
  const cookieID = req.signedCookies.id; // the cookie valuePromise

  console.log(cookieID);

  if (!cookieID) {
    console.log("COOKIE ID FAILED");
    next();
    return;
  }

  const cookie = await readCookie(cookieID);

  if (!cookie) {
    next();
    return;
  }

  res.locals.volunteer = await getVolunteer(cookie.volunteerId);
  res.locals.cookieExpiry = cookie.expiry;

  next();
};
