const { addVolunteerAndAuthenticate } = require("./volunteerAPI");

module.exports = async (req, res) => {
  let [success, message] = await addVolunteerAndAuthenticate(
    res.locals.volunteer,
    req.body.volunteerData
  );
  res.send({ success, message });
};
