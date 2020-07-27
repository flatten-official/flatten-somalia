const name = require("./package.json").name;
module.exports = require("../../scripts/createJestConfig")({
  name,
  setupFileAfterEnv: "<rootDir>/packages/db-scripts/src/setupTestAfterEnv.js",
});
