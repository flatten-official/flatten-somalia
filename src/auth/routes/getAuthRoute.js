module.exports = (req, res) => {
  if (res.locals.volunteer) {
    res.status(200).send({
      permissions: res.locals.volunteer.permissions,
      name: res.locals.volunteer.name,
      expiry: res.locals.cookieExpiry,
    });
  } else {
    // send an empty message signifying that the user is not logged in
    res.status(204).send({});
  }
};
