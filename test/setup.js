const { setup: setupLogger } = require("../src/winston");

process.env.ENVIRONMENT = "test";
setupLogger();
