const { addVolunteer, Permissions } = require("./volunteerData");
const volunteerData = require("./volunteerData");
const { isValidationTypeError } = require("../utils/mongoose");

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
    if (e.message.indexOf("duplicate key error") !== -1) {
      console.log(e);
      return [400, "Email is already in use"];
    } else if (isValidationTypeError(e)) {
      console.log(e);
      return [400, "Volunteer data malformed"];
    } else throw e;
  }

  return [200, "Success"];
}

async function getVolunteerList() {
  return [200, await volunteerData.getVolunteerList()];
}

/**
 *
 * @param updaterData the volunteer making the change
 * @param toUpdateInfo an object containing two fields, access (True/False) and the volunteer id
 */
function changeVolunteerAccessById(updaterData, toUpdateInfo) {
  if (toUpdateInfo.access) {
    return volunteerData.addPermissionByIdAsync(
      toUpdateInfo.volunteerId,
      volunteerData.Permissions.access,
      updaterData.permissions
    );
  } else {
    return volunteerData.removePermissionByIdAsync(
      toUpdateInfo.volunteerId,
      volunteerData.Permissions.access,
      updaterData.permissions
    );
  }
}

module.exports = {
  addVolunteerAndAuthenticate,
  getVolunteerList,
  changeVolunteerAccessById,
};
