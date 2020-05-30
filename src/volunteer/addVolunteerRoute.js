const { addVolunteerAndAuthenticate } = require("./volunteerAPI");

module.exports = async (req, res) => {
  let [success, message] = await addVolunteerAndAuthenticate(
    // admin doing the adding
    res.locals.volunteer,
    // volunteer to be added
    req.body.volunteerData
  );
  res.send({ success, message });
};
