const { cleanupDatabase, setupDatabase } = require("./utils/mongo");
const { getApp } = require("./app");
const { setup: configSetup } = require("./config");
const { setup: sendGridSetup } = require("./utils/sendGrid");
const _ = require("lodash");

/**
 * @param options object whose parameters indicate what to setup
 */
async function setup(options = {}) {
  options = _.defaults(options, {
    config: true,
    database: true,
    sendGrid: true,
  });

  if (options.config) await configSetup();
  if (options.database) await setupDatabase();
  if (options.sendGrid) sendGridSetup();
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
