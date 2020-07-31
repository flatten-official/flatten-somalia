const { getVolunteerListAsync } = require("./volunteerAPI");

module.exports = async (req, res) => {
  const result = await getVolunteerListAsync(res.locals.volunteer);

  res.status(200).send(result);
};
