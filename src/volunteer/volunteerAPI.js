const {
  addVolunteer,
  PERMISSION_MANAGE_VOLUNTEERS,
  PERMISSION_SUBMIT_FORMS,
} = require("./volunteerData");

async function addVolunteerAndAuthenticate(addedByData, newVolunteerData) {
  if (!addedByData) return [false, "Not authenticated"];
  if (!addedByData.permissions.includes("manageVolunteers")) {
    return [false, "Wrong Permissions"];
  }

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
    return [false, "Database Error"];
  }

  return [true, "Success"];
}

module.exports = {
  addVolunteerAndAuthenticate,
};
