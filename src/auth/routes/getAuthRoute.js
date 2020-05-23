module.exports = (req, res) => {
  if (res.locals.volunteer) {
    res.send({
      permissions: res.locals.volunteer.permissions,
      name: res.locals.volunteer.name,
      expiry: res.locals.cookieExpiry,
    });
  } else {
    // send an empty message signifying that the user is not logged in
    res.send({});
  }
};
