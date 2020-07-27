const {
  PermissionGroups,
  Volunteer,
} = require("backend/src/volunteer/volunteerData");
const expect = require("expect");

const scriptArguments = [[PermissionGroups.dsu]];

const confirmationMessage = `Are you sure you want to add permission groups [${scriptArguments[0]}] to all volunteers`;

const run = async (permissionGroupToSet) => {
  await Volunteer.updateMany(
    {},
    { $set: { permissionGroups: permissionGroupToSet } }
  );
};

const successTest = async (permissionGroupToSet) => {
  const volunteerWithoutGroup = await Volunteer.find({
    permissionGroups: { $not: { $all: permissionGroupToSet } },
  });
  expect(volunteerWithoutGroup).toHaveLength(0);
};

module.exports = {
  scriptArguments,
  confirmationMessage,
  run,
  successTest,
};
