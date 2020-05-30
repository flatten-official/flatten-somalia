const {
  addVolunteer,
  PERMISSION_MANAGE_VOLUNTEERS,
  PERMISSION_SUBMIT_FORMS,
} = require("./volunteerData");

async function addVolunteerAndAuthenticate(addedByData, newVolunteerData) {
  if (!addedByData) return [401, "Not authenticated"];
  if (!addedByData.permissions.includes(PERMISSION_MANAGE_VOLUNTEERS))
    return [403, "Wrong Permissions"];

  const permissions = [];
  if (newVolunteerData.permManageVolunteers)
    permissions.push(PERMISSION_MANAGE_VOLUNTEERS);
  if (newVolunteerData.permSubmitForms)
    permissions.push(PERMISSION_SUBMIT_FORMS);

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
    console.error(e);
    return [500, "Database Error"]; // TODO if validation return 400 error instead
  }

  return [200, "Success"];
}

module.exports = {
  addVolunteerAndAuthenticate,
};
