const base = require("./jest.config.base");

module.exports = {
  ...base,
  projects: ["packages/*/jest.config.js"],
};
