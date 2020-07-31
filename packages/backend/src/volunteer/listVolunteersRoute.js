const { getVolunteerList } = require("./volunteerAPI");

module.exports = async (req, res) => {
  const result = await getVolunteerList(res.locals.volunteer);

  res.status(200).send(result);
};
