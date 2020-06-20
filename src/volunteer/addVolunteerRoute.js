const { addVolunteerAndAuthenticate } = require("./volunteerAPI");
const mongoose = require("mongoose");
const { PermissionDeniedError } = require("../utils/errors");

module.exports = async (req, res) => {
  try {
    await addVolunteerAndAuthenticate(
      // admin doing the adding
      res.locals.volunteer,
      // volunteer to be added
      req.body.volunteerData
    );

    res.sendStatus(200);
  } catch (e) {
    if (e.message.indexOf("duplicate key error") !== -1) {
      console.error(e);
      res.status(400).send("Email is already in use");
    } else if (e instanceof mongoose.Error.ValidationError) {
      console.error(e);
      res.status(400).send("Volunteer data malformed");
    } else if (e instanceof PermissionDeniedError) {
      console.log(e);
      res.sendStatus(403);
    } else throw e;
  }
};
