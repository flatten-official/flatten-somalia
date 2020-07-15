const base = require("../../jest.config.base");

const displayName = require("./package.json").name;

module.exports = {
  ...base,
  rootDir: "../../",
  displayName,
};
