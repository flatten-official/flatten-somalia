/**
 * A function that returns middleware to protect the route (aka. require certain permissions)
 * @param requiredPermissions array of permission that are required to access this route
 * @return {function(...[*]=)}
 */
// TODO Write tests
const { Permissions } = require("../../volunteer/volunteerData");
module.exports = (requiredPermissions) => async (req, res, next) => {
  requiredPermissions.push(Permissions.active);
  if (!res.locals.volunteer) res.sendStatus(401);
  else if (
    requiredPermissions.every((permission) =>
      res.locals.volunteer.permissions.includes(permission)
    )
  ) {
    next();
  } else {
    res.sendStatus(403);
  }
};
