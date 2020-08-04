const { addVolunteer, Permissions } = require("./volunteerData");
const { mongoose } = require("util-db");
const { log } = require("util-logging");
const { ApiError } = require("../utils/errors");

async function addVolunteerAndAuthenticate(addedByData, newVolunteerData) {
  const permissions = [Permissions.access];

  if (newVolunteerData.permSubmitForms)
    permissions.push(Permissions.submitForms);

  const volunteer = {
    name: newVolunteerData.name,
    email: newVolunteerData.email,
    addedBy: addedByData["_id"],
    teamName: newVolunteerData.teamName,
    permissions,
    // todo - gender and age
  };

  try {
    await addVolunteer(volunteer);
  } catch (e) {
    if (e.message.indexOf("duplicate key error") !== -1) {
      log.error("Duplicate key error", { error: e });
      throw new ApiError("Email is already in use", 400);
    } else if (e instanceof mongoose.Error.ValidationError) {
      log.error("Volunteer data malformed", { error: e });
      throw new ApiError("Volunteer data malformed", 400);
    } else throw e;
  }
}

module.exports = { addVolunteerAndAuthenticate };
