const dotEnv = require("dotenv");
const { cleanupDatabase, setupDatabase } = require("./utils/mongo");
const { getApp } = require("./app");
const { setup: configSetup } = require("./config");
const { setup: sendGridSetup } = require("./utils/sendGrid");

/**
 * @param includeDatabase used by test environment to load custom database
 */
async function setup(includeDatabase = true) {
  dotEnv.config(); // Load environment variables from .env
  await configSetup();
  if (includeDatabase) await setupDatabase();
  sendGridSetup();
}

async function startServer() {
  const port = process.env.PORT || 80;

  const app = await getApp();
  app.listen(port, () => {
    console.log(`listening on port ${port}.`);
  });
}

async function cleanup() {
  await cleanupDatabase();
}

module.exports = { setup, startServer, cleanup };
