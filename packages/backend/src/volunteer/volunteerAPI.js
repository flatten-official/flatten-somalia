const Volunteer = require("./volunteerData");
const { log } = require("util-logging");
const { ApiError, isValidationError } = require("../utils/errors");

async function addVolunteerAndAuthenticate(addedByData, newVolunteerData) {
  const permissions = [Volunteer.Permissions.access];

  if (newVolunteerData.permSubmitForms)
    permissions.push(Volunteer.Permissions.submitForms);

  const volunteer = {
    name: newVolunteerData.name,
    email: newVolunteerData.email,
    addedBy: addedByData["_id"],
    teamName: newVolunteerData.teamName,
    permissions,
    // todo - gender and age
  };

  try {
    await Volunteer.addVolunteer(volunteer);
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
  const volunteers = await Volunteer.getVolunteers();

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
  if (updaterData._id.toString() === toUpdateId)
    throw new ApiError("Can't update your own permissions", 400);

  const volunteerToUpdate = await Volunteer.findVolunteerById(toUpdateId);

  if (!volunteerToUpdate) {
    log.warning(`Volunteer with id ${toUpdateId} not found.`);
    throw new ApiError("Volunteer not found", 400);
  }

  // Can only edit access on DSU volunteers
  if (
    !volunteerToUpdate.permissionGroups.includes(Volunteer.PermissionGroups.dsu)
  )
    throw new ApiError("Wrong permissions", 403);

  let newVolunteer;

  if (giveAccess)
    newVolunteer = await Volunteer.addPermission(
      Volunteer.Permissions.access,
      volunteerToUpdate
    );
  else
    newVolunteer = await Volunteer.removePermission(
      Volunteer.Permissions.access,
      volunteerToUpdate
    );

  return {
    _id: newVolunteer._id,
    permissions: newVolunteer.permissions,
  };
}

module.exports = {
  addVolunteerAndAuthenticate,
  getVolunteerList,
  changeVolunteerAccessById,
};
