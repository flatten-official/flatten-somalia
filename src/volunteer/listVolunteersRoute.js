const { getVolunteerList } = require("./volunteerAPI");

module.exports = async (req, res) => {
  const [statusCode, message] = await getVolunteerList(res.locals.volunteer);

  res.status(statusCode).send(message);
};
