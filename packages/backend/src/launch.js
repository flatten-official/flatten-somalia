// Not inline since rollup will not make import package regardless since it's statically typed
const dotenv = require("dotenv");

if (process.env.ENVIRONMENT === "dev") {
  dotenv.config();
}

const { setup, startServer, cleanup } = require("./main");

setup({ database: true, sendGrid: true })
  .then(() => startServer())
  .catch(async (e) => {
    await cleanup();
    throw e;
  });
