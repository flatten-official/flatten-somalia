const { readCookie } = require("./cookieData");
const { getPermissions } = require("./../volunteer/volunteerData");
// Performs the appropriate actions to log in a user.
module.exports.loginRoute = (req, res) => {
  res.sendStatus(200);
};

// Verifies a token in the request and gives the user a cookie.
module.exports.verifyTokenRoute = (req, res) => {
  res.sendStatus(200);
};

// Reads the user's cookie and sends back the appropriate data from it.
module.exports.readCookieRoute = (req, res) => {
  res.sendStatus(200);
};

/**
 * If cookie is invalid, redirects to the /auth page.
 * If cookie is valid, add volunteerId and permissions to res.locals for use by the endpoint.
 */
module.exports.cookieParserMiddleware = async (req, res, next) => {
  // TODO Read cookie
  const cookieID = null; // the cookie value

  const cookie = await readCookie(cookieID);

  if (!cookie) res.redirect(process.env.FRONTEND_DOMAIN + "/auth");

  res.locals.permissions = await getPermissions(cookie.volunteerId);
  res.locals.volunteerId = cookie.volunteerId;

  next();
};
