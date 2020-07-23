const { log } = require("util-logging");
const {
  Permissions,
  addVolunteer,
  findVolunteerByEmail,
} = require("backend/src/volunteer/volunteerData");
const { runOpWithinTransaction } = require("backend/src/utils/mongoose");

// STEP 1.
// If applicable, pass in your data, and any other options to the array.
// This array will automatically be passed as arguments to the run function and the success test function.
const scriptArguments = [
  [
    {
      name: "Some name",
      email: "example@gmail.com",
      permissions: [Permissions.submitForms],
      teamName: "Flatten", // Use Flatten as the team name for people who's submissions should be ignored
    },
  ],
];

// STEP 2.
// Set the prompt to something descriptive. You can even include the data from `arguments`
// A question mark will automatically be appended to the prompt.
const confirmationMessage = `${JSON.stringify(
  scriptArguments[0],
  null,
  "  "
)}\\nAre you sure you want to add the above volunteers to the database?\``;

// eslint-disable-next-line require-await
const run = async (volunteers) => {
  // STEP 3.
  // Write your script in the run function.
  // This function should be pure, do not access global scope (instead use arguments). (This helps to test).
  // To add or remove arguments modify the scriptArguments array
  // In this case firstParameter = "I will get printed"
  log.info("Adding volunteers to database...");

  await runOpWithinTransaction(async (session) => {
    for (const volunteer of volunteers) {
      try {
        await addVolunteer(volunteer, session);
      } catch (e) {
        log.error(`Failed to add volunteer:\n${JSON.stringify(volunteer)}`);
        throw e;
      }
    }
  });
};

// eslint-disable-next-line no-unused-vars
const successTest = async (volunteers) => {
  // STEP 4.
  // Write your success test
  // For example,
  // expect(consoleOutput).toMatch(firstParameter);
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
