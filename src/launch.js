const { setup, startServer, cleanup } = require("./index");

setup({ database: true, sendGrid: true })
  .then(() => startServer())
  .catch(async (e) => {
    await cleanup();
    throw e;
  });
