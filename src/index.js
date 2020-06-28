const { cleanupDatabase, setupDatabase } = require("./utils/mongoConnect");
const { getApp } = require("./app");
const { setup: configSetup } = require("./config");
const { setup: sendGridSetup } = require("./utils/sendGrid");
const _ = require("lodash");

const { log } = require("./utils/winston");

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

  if (options.config) await configSetup(options.customConfig);
  if (options.database) await setupDatabase();
  if (options.sendGrid) sendGridSetup();
}

async function startServer() {
  const port = process.env.PORT || 80;

  const app = await getApp();
  app.listen(port, () => {
    log.notice(`Listening on port ${port}.`, { port });
  });
}

async function cleanup() {
  await cleanupDatabase();
}

module.exports = { setup, startServer, cleanup };
