const name = require("./package.json").name;
module.exports = require("../../scripts/createJestConfig")({
  name,
  setupFilesAfterEnv: [
    "<rootDir>/packages/db-scripts/src/setupTestAfterEnv.js",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    `<rootDir>/packages/${name}/src/_archive`,
  ],
});
