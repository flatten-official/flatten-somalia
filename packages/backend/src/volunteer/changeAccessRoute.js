const { changeVolunteerAccessById } = require("./volunteerAPI");
const { log } = require("util-logging");
const { ApiError } = require("../utils/errors");

module.exports = async (req, res) => {
  const { volunteerId, access } = req.body;

  if (typeof access !== "boolean")
    throw new ApiError("access in body is not a boolean", 400);

  const result = await changeVolunteerAccessById(
    res.locals.volunteer,
    volunteerId,
    access
  );

  res.status(200).send(result);
  log.info(`Changed volunteer ${volunteerId} access to ${access}`, {
    status: 200,
  });
};
