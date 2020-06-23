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

module.exports.Config = {
  useAutoSetup: true,
};

module.exports.getConfirmationMessage = () =>
  `Are you sure you want to add the following volunteers to the database.\n${JSON.stringify(
    VOLUNTEERS
  )}`;

module.exports.run = async () => {
  console.log("Adding volunteers to database...");

  for (const volunteer of VOLUNTEERS) {
    await addVolunteer(volunteer);
  }
};
