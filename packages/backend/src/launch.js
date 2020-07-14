if (process.env.ENVIRONMENT === "dev") require("dotenv").config();

const { setup, startServer, cleanup } = require("./index");

setup({ database: true, sendGrid: true })
  .then(() => startServer())
  .catch(async (e) => {
    await cleanup();
    throw e;
  });
