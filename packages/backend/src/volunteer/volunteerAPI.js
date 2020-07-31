const { addVolunteer, Permissions } = require("./volunteerData");
const {
  addPermissionByIdAsync,
  getVolunteers,
  removePermissionByIdAsync,
  PermissionGroups,
  findVolunteerById,
} = require("./volunteerData");
const { log } = require("util-logging");
const { ApiError, isValidationError } = require("../utils/errors");

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
    } else if (isValidationError(e)) {
      log.error("Volunteer data malformed", { error: e });
      throw new ApiError("Volunteer data malformed", 400);
    } else throw e;
  }
}

const getVolunteerList = async () => {
  const volunteers = await getVolunteers();

  return volunteers.map((v) => ({
    _id: v._id,
    email: v.email,
    name: v.name,
    teamName: v.teamName,
    permissions: v.permissions,
    permissionGroups: v.permissionGroups,
  }));
};

/**
 *
 * @param updaterData the volunteer making the change
 * @param toUpdateId the id of the volunteer to update
 * @param giveAccess true or false, determines whether they should have access or not
 */
async function changeVolunteerAccessById(updaterData, toUpdateId, giveAccess) {
  const volunteerToUpdate = await findVolunteerById(toUpdateId);

  if (!volunteerToUpdate) {
    log.warning(`Volunteer with id ${toUpdateId} not found.`);
    throw new ApiError("Volunteer not found", 400);
  }

  if (!(volunteerToUpdate.permissionGroups[0] === PermissionGroups.dsu))
    throw new ApiError("Wrong permissions", 403);

  if (giveAccess)
    return addPermissionByIdAsync(Permissions.access, volunteerToUpdate);
  else return removePermissionByIdAsync(Permissions.access, toUpdateId);
}

module.exports = {
  addVolunteerAndAuthenticate,
  getVolunteerList,
  changeVolunteerAccessById,
};
