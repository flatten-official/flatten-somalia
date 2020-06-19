const { activateVolunteerById } = require("./volunteerAPI");

module.exports = async (req, res) => {
  const [statusCode, message] = await activateVolunteerById(
    res.locals.volunteer,
    req.body
  );

  res.status(statusCode).send(message);
};
