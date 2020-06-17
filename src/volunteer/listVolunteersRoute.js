const { getVolunteerList } = require("./volunteerAPI");

module.exports = async (req, res) => {
  const [statusCode, message] = await getVolunteerList(
    // admin doing the adding
    res.locals.volunteer
  );

  res.status(statusCode).send(message);
};
