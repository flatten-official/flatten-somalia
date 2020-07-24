/**
 *  This script takes an array of volunteers and adds them to the database
 */

const {
  Permissions,
  addVolunteer,
  findVolunteerByEmail,
} = require("backend/src/volunteer/volunteerData");
const { log } = require("util-logging");
const { runOpWithinTransaction } = require("backend/src/utils/mongoose");

const VOLUNTEERS = [
  {
    name: "Some name",
    email: "example@gmail.com",
    permissions: [Permissions.submitForms],
    teamName: "Flatten", // Use Flatten as the team name for people who's submissions should be ignored
  },
];
const scriptArguments = [VOLUNTEERS];

const confirmationMessage = `${JSON.stringify(
  VOLUNTEERS,
  null,
  "  "
)}\nAre you sure you want to add the above volunteers to the database?`;

const run = async (volunteers) => {
  log.info("Adding volunteers to database...");

  await runOpWithinTransaction(async (session) => {
    for (const volunteer of volunteers) {
      try {
        await addVolunteer(volunteer, session);
      } catch (e) {
        log.error(`Failed to add volunteer:\n${JSON.stringify(volunteer)}`, {
          error: e,
        });
        throw e;
      }
    }
  });
};

const successTest = async (volunteers) => {
  for (const volunteer of volunteers) {
    const volunteerFound = await findVolunteerByEmail(volunteer.email);

    expect(volunteerFound).not.toBeNull();
    expect(volunteerFound.toJSON()).toMatchObject(volunteer);
  }
};

module.exports = {
  scriptArguments,
  confirmationMessage,
  run,
  successTest,
};
