const { addVolunteerAndAuthenticate } = require("./volunteerAPI");
const { log } = require("util-logging");

module.exports = async (req, res) => {
  await addVolunteerAndAuthenticate(
    // admin doing the adding
    res.locals.volunteer,
    // volunteer to be added
    req.body.volunteerData
  );

  res.sendStatus(200);
  log.info("added volunteer", { status: 200 });
};
