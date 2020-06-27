const { setup: setupLogger } = require("../src/utils/winston");

process.env.ENVIRONMENT = "test";
setupLogger();
