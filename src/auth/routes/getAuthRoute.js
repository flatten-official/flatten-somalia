module.exports = (req, res) => {
  if (res.locals.volunteer) {
    res.send({
      permissions: res.locals.volunteer.permissions,
      name: res.locals.volunteer.name,
      expiry: req.locals.cookieExpiry,
    });
  } else {
    res.sendStatus(401);
  }
};
