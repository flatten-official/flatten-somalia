/**
 *  This script takes an array of volunteers and adds them to the database
 */

const { Permissions, addVolunteer } = require("../src/volunteer/volunteerData");

const VOLUNTEERS = [
  {
    name: "Some name",
    email: "example@gmail.com",
    permissions: [Permissions.submitForms],
    teamName: "Flatten", // Use Flatten as the team name for people who's submissions should be ignored
  },
];

module.exports.arguments = [VOLUNTEERS];

module.exports.useAutoSetup = true;

module.exports.confirmationMessage = `Are you sure you want to add the following volunteers to the database.\n${JSON.stringify(
  VOLUNTEERS,
  null,
  "  "
)}\n`;

module.exports.run = async (volunteers) => {
  console.log("Adding volunteers to database...");

  for (const volunteer of volunteers) {
    try {
      await addVolunteer(volunteer);
    } catch (e) {
      console.log(`Failed to add volunteer:\n${JSON.stringify(volunteer)}`);
      throw e;
    }
  }
};
