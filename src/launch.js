const { setup, startServer, cleanup } = require("./index");

setup()
  .then(() => startServer())
  .catch(async (e) => {
    console.log(e);
    await cleanup();
  });
