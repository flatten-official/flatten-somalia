/**
 *
 * @param requiredPermissions array of permission that are required to access this route
 * @return {function(...[*]=)}
 */
// TODO Write tests
module.exports = (requiredPermissions) => async (req, res, next) => {
  if (!res.locals.volunteer) res.sendStatus(401);
  if (
    requiredPermissions.every((permission) =>
      res.locals.volunteer.permissions.includes(permission)
    )
  ) {
    next();
  } else {
    res.sendStatus(403);
  }
};
