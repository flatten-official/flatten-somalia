const name = require("./package.json").name;
module.exports = require("../../scripts/createJestConfig")({
  name,
  setupFilesAfterEnv: ["<rootDir>/packages/backend/test/setupAfterEnv.js"],
});
