const name = require("./package.json").name;
module.exports = require("../../scripts/createJestConfig")({
  name,
  setupFileAfterEnv: "<rootDir>/packages/backend/test/setupAfterEnv.js",
});
