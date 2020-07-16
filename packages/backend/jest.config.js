const name = require("./package.json").name;
module.exports = require("../../scripts/createJestConfig")(name);
