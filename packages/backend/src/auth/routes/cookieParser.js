const { readCookie } = require("../cookieData");
const { findVolunteerById } = require("../../volunteer/volunteerData");
const { log } = require("util-logging");

/**
 * If cookie is valid, add volunteer and expiry to res.locals for use by the endpoint.
 */
module.exports = async (req, res, next) => {
  const cookieID = req.signedCookies.id; // the signed cookie "id" stores the cookieID

  if (!cookieID) {
    log.debug("No cookie found.");
    next();
    return;
  }

  const cookie = await readCookie(cookieID);

  if (!cookie) {
    log.warning("Invalid cookie id or cookie expired");
    next();
    return;
  }

  res.locals.volunteer = await findVolunteerById(cookie.volunteerId);
  res.locals.cookieExpiry = cookie.expiry;

  next();
};
