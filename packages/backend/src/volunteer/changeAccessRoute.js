const { changeVolunteerAccessById } = require("./volunteerAPI");

module.exports = async (req, res) => {
  // TODO ADD validation to body, also read the two params in the route instead of the api
  const result = await changeVolunteerAccessById(
    res.locals.volunteer,
    res.body.volunteerId,
    req.body.access
  );

  res.status(200).send(result);
};
