const { addVolunteer, Permissions } = require("./volunteerData");
const { Error } = require("mongoose");
const volunteerData = require("./volunteerData");

async function addVolunteerAndAuthenticate(addedByData, newVolunteerData) {
  const permissions = newVolunteerData.permissions
    ? [Permissions.submitForms, Permissions.active]
    : [Permissions.active];

  const volunteer = {
    name: newVolunteerData.name,
    email: newVolunteerData.email,
    teamName: newVolunteerData.teamName,
    addedBy: addedByData["_id"],
    permissions,
    permissionGroups: newVolunteerData.permissionGroups,
    // todo - gender and age
  };

  try {
    await addVolunteer(volunteer);
  } catch (e) {
    console.log(e);
    if (e.message.indexOf("duplicate key error") !== -1)
      return [400, "Email is already in use"];
    else if (e instanceof Error.ValidationError)
      return [400, "Volunteer data malformed"];
    else throw e;
  }

  return [200, "Success"];
}

async function getVolunteerList(userData) {
  if (userData.permissions.indexOf(Permissions.manageVolunteers) > -1) {
    return [200, await volunteerData.getVolunteerList()];
  }
  return [403, []];
}

async function activateVolunteerById(updaterData, toUpdateInfo) {
  let success;
  if (toUpdateInfo.activate) {
    success = volunteerData.addPermissionById(
      toUpdateInfo.volunteerId,
      volunteerData.Permissions.active,
      updaterData.permissionGroups
    );
  } else {
    success = volunteerData.removePermissionById(
      toUpdateInfo.volunteerId,
      volunteerData.Permissions.active,
      updaterData.permissionGroups
    );
  }
  return [success ? 200 : 500, success ? "Success" : "Internal server error."];
}

module.exports = {
  addVolunteerAndAuthenticate,
  getVolunteerList,
  activateVolunteerById,
};
