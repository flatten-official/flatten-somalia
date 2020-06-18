const { addVolunteer, Permissions } = require("./volunteerData");
const { Error } = require("mongoose");
const volunteerData = require("./volunteerData");

async function addVolunteerAndAuthenticate(addedByData, newVolunteerData) {
  const permissions = newVolunteerData.permSubmitForms
    ? [Permissions.submitForms]
    : [];

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
  if (userData.permissions.indexOf(Permissions.manageVolunteers) > -1) {
    return [200, await volunteerData.getVolunteerList()];
  }
  return [403, []];
}

async function enableVolunteerById() {}

async function disableVolunteerById() {}

module.exports = { addVolunteerAndAuthenticate, getVolunteerList };
