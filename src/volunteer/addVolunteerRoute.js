const { addVolunteerAndAuthenticate } = require("./volunteerAPI");

module.exports = async (req, res) => {
  const [statusCode, message] = await addVolunteerAndAuthenticate(
    // admin doing the adding
    res.locals.volunteer,
    // volunteer to be added
    req.body.data
  );

  res.status(statusCode).send(message);
};
