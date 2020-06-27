const { cleanupDatabase, setupDatabase } = require("./utils/mongo");
const { getApp } = require("./app");
const { setup: configSetup } = require("./config");
const { setup: sendGridSetup } = require("./utils/sendGrid");
const { setup: setupLogger } = require("./winston");
const _ = require("lodash");

const { getLogger } = require("./winston");

/**
 * @param options object whose parameters indicate what to setup
 */
async function setup(options = {}) {
  options = _.defaults(options, {
    config: true,
    database: false,
    sendGrid: false,
    customConfig: {},
  });

  setupLogger();
  if (options.config) await configSetup(options.customConfig);
  if (options.database) await setupDatabase();
  if (options.sendGrid) sendGridSetup();
}

async function startServer() {
  const port = process.env.PORT || 80;

  const app = await getApp();
  app.listen(port, () => {
    getLogger().notice(`Listening on port ${port}.`, { port });
  });
}

async function cleanup() {
  await cleanupDatabase();
}

module.exports = { setup, startServer, cleanup };
