const {
  addVolunteer,
  PERMISSION_MANAGE_VOLUNTEERS,
  PERMISSION_SUBMIT_FORMS,
} = require("./volunteerData");
const { Error } = require("mongoose");

async function addVolunteerAndAuthenticate(addedByData, newVolunteerData) {
  if (!addedByData) return [401, "Not authenticated"];
  if (!addedByData.permissions.includes(PERMISSION_MANAGE_VOLUNTEERS))
    return [403, "Wrong Permissions"];

  const permissions = newVolunteerData.permSubmitForms
    ? [PERMISSION_SUBMIT_FORMS]
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

function canSubmitForms(volunteer) {
  return volunteer.permissions.indexOf(PERMISSION_SUBMIT_FORMS) > -1;
}

module.exports = {
  addVolunteerAndAuthenticate,
  canSubmitForms,
};
