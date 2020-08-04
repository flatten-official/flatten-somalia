const { getVolunteerList } = require("./volunteerAPI");
const { log } = require("util-logging");

module.exports = async (req, res) => {
  const result = await getVolunteerList(res.locals.volunteer);

  res.status(200).send(result);
  log.info("Listed volunteers.", { status: 200 });
};
