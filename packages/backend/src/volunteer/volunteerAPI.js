const { addVolunteer, Permissions } = require("./volunteerData");
const { Error } = require("mongoose");
const { log } = require("util-logging");

async function addVolunteerAndAuthenticate(addedByData, newVolunteerData) {
  const permissions = newVolunteerData.permSubmitForms
    ? [Permissions.submitForms]
    : [];

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
      return [400, "Email is already in use"];
    } else if (e instanceof Error.ValidationError) {
      log.error("Volunteer data malformed", { error: e });
      return [400, "Volunteer data malformed"];
    } else throw e;
  }

  return [200, "Success"];
}

module.exports = { addVolunteerAndAuthenticate };
