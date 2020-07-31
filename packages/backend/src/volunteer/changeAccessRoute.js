const { changeVolunteerAccessById } = require("./volunteerAPI");

module.exports = async (req, res) => {
  // TODO ADD validation to body
  const result = await changeVolunteerAccessById(
    res.locals.volunteer,
    res.body.volunteerId,
    req.body.access
  );

  res.status(200).send(result);
};
