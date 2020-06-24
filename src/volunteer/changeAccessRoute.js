const { changeVolunteerAccessById } = require("./volunteerAPI");

module.exports = async (req, res) => {
  const [statusCode, message] = await changeVolunteerAccessById(
    res.locals.volunteer,
    req.body
  );

  res.status(statusCode).send(message);
};
