require("dotenv").config(); // Load environment variables from .env
const { setup, startServer, cleanup } = require("./index");

setup()
  .then(() => startServer())
  .catch(async (e) => {
    await cleanup();
    throw e;
  });
