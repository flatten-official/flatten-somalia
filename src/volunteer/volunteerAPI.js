const { PermissionDeniedError } = require("../utils/errors");
const { addVolunteer, Permissions } = require("./volunteerData");

// Use ALLOWED_PERMISSIONS rather than BLOCKED/RESTRICTED permissions since we don't want the default to be allowed
const ALLOWED_PERMISSIONS = [
  Permissions.submitHospitalSurvey,
  Permissions.submitGravediggerSurvey,
  Permissions.submitHouseholdSurvey,
];

async function addVolunteerAndAuthenticate(addedByData, newVolunteerData) {
  for (const permission of newVolunteerData.permissions) {
    if (!ALLOWED_PERMISSIONS.includes(permission))
      throw new PermissionDeniedError(
        `You can't create a volunteer with permission: ${permission}`
      );
  }

  // make sure newVolunteerData is the first element such that it doesn't override any other element (since it's user provided)
  const volunteer = { ...newVolunteerData, addedBy: addedByData._id };

  await addVolunteer(volunteer);
}

module.exports = { addVolunteerAndAuthenticate };
