if (process.env.ENVIRONMENT === "dev") require("dotenv").config();

const { setup, startServer, cleanup } = require("./index");
const { log } = require("util-logging");

setup({ database: true, sendGrid: true })
  .then(startServer)
  .catch(async (e) => {
    log.emergency("Server crashed.", { error: e });
    await cleanup();
  });
