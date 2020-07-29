const {
  Permissions,
  Volunteer,
} = require("backend/src/volunteer/volunteerData");
const expect = require("expect");
const { log } = require("util-logging");

const scriptArguments = [];

const confirmationMessage = `Are you sure you want to add ${Permissions.access} to all volunteers`;

const run = async () => {
  // https://docs.mongodb.com/manual/reference/operator/query/
  const result = await Volunteer.updateMany(
    { permissions: { $not: { $all: [Permissions.access] } } }, // If you don't have permissions.access
    { $push: { permissions: Permissions.access } } // push it onto the list
  );

  log.notice(`Added access permissions to ${result.n} documents`);
};

const successTest = async () => {
  const volunteersWithoutAccess = await Volunteer.find({
    permissions: { $not: { $all: [Permissions.access] } },
  });

  expect(volunteersWithoutAccess).toHaveLength(0);
};

module.exports = {
  scriptArguments,
  confirmationMessage,
  run,
  successTest,
};
