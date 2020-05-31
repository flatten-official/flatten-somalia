const { addVolunteer, Permissions } = require("./volunteerData");
const { Error } = require("mongoose");

async function addVolunteerAndAuthenticate(addedByData, newVolunteerData) {
  const permissions = newVolunteerData.permSubmitForms
    ? [Permissions.submitForms]
    : [];

  const volunteer = {
    name: newVolunteerData.name,
    email: newVolunteerData.email,
    addedBy: addedByData["_id"],
    permissions,
    // todo - gender and age
  };

  try {
    await addVolunteer(volunteer);
  } catch (e) {
    console.log(e);
    if (e.message.indexOf("duplicate key error") !== -1)
      return [400, "Email is already in use"];
    if (e instanceof Error.ValidationError)
      return [400, "Volunteer data malformed"];
    return [500, "Database Error"]; // TODO if validation return 400 error instead
  }

  return [200, "Success"];
}

module.exports = { addVolunteerAndAuthenticate };
