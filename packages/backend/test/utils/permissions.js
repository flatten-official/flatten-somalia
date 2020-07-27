const { Permissions } = require("../../src/volunteer/volunteerData");

module.exports.getAllPermissionsExcept = (permission) =>
  Object.values(Permissions).filter((v) => v !== permission);
