const { log } = require("util-logging");

module.exports = (req, res) => {
  if (res.locals.volunteer) {
    res.status(200).send({
      permissions: res.locals.volunteer.permissions,
      name: res.locals.volunteer.name,
      expiry: res.locals.cookieExpiry,
      friendlyId: res.locals.volunteer.friendlyId,
      teamName: res.locals.volunteer.teamName,
    });
    log.info(`Token verified for user ${res.locals.volunteer.friendlyId}`, {
      status: 200,
      userID: res.locals.volunteer.friendlyId,
      permissions: res.locals.volunteer.permissions,
    });
  } else {
    // send an empty message signifying that the user is not logged in
    res.status(200).send({});
    log.info(`User was not logged in.`, {
      status: 200,
    });
  }
};
