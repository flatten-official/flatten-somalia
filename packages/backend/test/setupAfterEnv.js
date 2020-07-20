const Config = require("util-config");
const configFile = require("../src/config");
const { log } = require("util-logging");

// Setup the testing config
Config.setup(configFile).then(() => log.info("Done loading config."));
