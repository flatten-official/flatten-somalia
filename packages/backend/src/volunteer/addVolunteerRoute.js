const { addVolunteerAndAuthenticate } = require("./volunteerAPI");

module.exports = async (req, res) => {
  await addVolunteerAndAuthenticate(
    // admin doing the adding
    res.locals.volunteer,
    // volunteer to be added
    req.body.volunteerData
  );

  res.sendStatus(200);
};
