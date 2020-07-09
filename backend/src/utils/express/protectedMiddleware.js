const { log } = require("../winston");

/**
 * A function that returns middleware to protect the route (aka. require certain permissions)
 * @param requiredPermissions array of permission that are required to access this route
 * @return {function(...[*]=)}
 */
// TODO Write tests
module.exports = (requiredPermissions) => (req, res, next) => {
  if (!res.locals.volunteer) {
    res.sendStatus(401);
    log.warning("Tried to access a protected route without login.", {
      status: 401,
    });
  } else if (
    requiredPermissions.every((permission) =>
      res.locals.volunteer.permissions.includes(permission)
    )
  ) {
    next();
  } else {
    res.sendStatus(403);
    log.warning(
      `Tried to access a protected route without proper permissions. Volunteer friendly id: ${res.locals.volunteer.friendlyId}`,
      { status: 403 }
    );
  }
};
