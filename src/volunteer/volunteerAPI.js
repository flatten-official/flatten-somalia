const { addVolunteer } = require("./volunteerData");

async function addVolunteerAndAuthenticate(addedByData, newVolunteerData) {
  if (!addedByData.permissions.includes("manageVolunteers")) {
    return [false, "Wrong Permissions"];
  }

  try {
    await addVolunteer(
      newVolunteerData.name,
      newVolunteerData.email,
      addedByData["_id"],
      newVolunteerData.permManageVolunteers,
      newVolunteerData.permSubmitForms
      // todo - gender and age
    );
  } catch (e) {
    console.error(e);
    return [false, "Database Error"];
  }

  return [true, "Success"];
}

module.exports = {
  addVolunteerAndAuthenticate,
};
