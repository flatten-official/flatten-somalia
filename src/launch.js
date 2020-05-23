const { setup, startServer, cleanup } = require("./index");

setup()
  .then(() => startServer())
  .catch(async (e) => {
    await cleanup();
    throw e;
  });
