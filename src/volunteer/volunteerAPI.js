const { addVolunteer, Permissions } = require("./volunteerData");
const { Error } = require("mongoose");
const volunteerData = require("./volunteerData");

async function addVolunteerAndAuthenticate(addedByData, newVolunteerData) {
  const permissions = [Permissions.access];
  if (newVolunteerData.permSubmitForms)
    permissions.push(Permissions.submitForms);

  const volunteer = {
    name: newVolunteerData.name,
    email: newVolunteerData.email,
    teamName: newVolunteerData.teamName,
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
    else if (e instanceof Error.ValidationError)
      return [400, "Volunteer data malformed"];
    else throw e;
  }

  return [200, "Success"];
}

async function getVolunteerList(userData) {
  return [200, await volunteerData.getVolunteerList()];
}

async function activateVolunteerById(updaterData, toUpdateInfo) {
  if (toUpdateInfo.activate) {
    return await volunteerData.addPermissionById(
      toUpdateInfo.volunteerId,
      volunteerData.Permissions.access,
      updaterData.permissionGroups
    );
  } else {
    return await volunteerData.removePermissionById(
      toUpdateInfo.volunteerId,
      volunteerData.Permissions.access,
      updaterData.permissionGroups
    );
  }
}

module.exports = {
  addVolunteerAndAuthenticate,
  getVolunteerList,
  activateVolunteerById,
};
