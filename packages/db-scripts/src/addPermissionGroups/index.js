const {
  PermissionGroups,
  Volunteer,
} = require("backend/src/volunteer/volunteerData");

const scriptArguments = [[PermissionGroups.dsu]];

const confirmationMessage = `Are you sure you want to add permission group ${PermissionGroups.dsu} to everyone`;

const run = async (permissionGroupToSet) => {
  await Volunteer.updateMany({}, { permissionGroups: permissionGroupToSet });
};

// eslint-disable-next-line no-unused-vars
const successTest = async (firstParameter) => {
  // STEP 4.
  // Write your success test
  //
  // For example,
  // expect(consoleOutput).toMatch(firstParameter);
};

module.exports = {
  scriptArguments,
  confirmationMessage,
  run,
  successTest,
};
