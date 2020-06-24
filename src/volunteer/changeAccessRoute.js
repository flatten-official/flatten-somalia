const { changeVolunteerAccessById } = require("./volunteerAPI");

module.exports = async (req, res) => {
  // TODO ADD validation to body, also read the two params in the route instead of the api
  const [statusCode, message] = await changeVolunteerAccessById(
    res.locals.volunteer,
    req.body
  );

  res.status(statusCode).send(message);
};
