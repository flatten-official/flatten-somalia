const mongoose = require("mongoose");
const MongoDatabase = require("db-utils/externalDb")(mongoose);
const { getApp } = require("./app");
const { setup: configSetup, getConfig } = require("./config");
const { setup: sendGridSetup } = require("./utils/sendGrid");
const _ = require("lodash");

const { log } = require("util-logging");
const removeCookieJob = require("./auth/removeCookieJob");

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
  if (options.database) {
    const mongoUri = getConfig().secrets.mongoUri;
    await MongoDatabase.connect(mongoUri);
    removeCookieJob.start();
  }
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
  await MongoDatabase.disconnect();
  removeCookieJob.stop();
}

module.exports = { setup, startServer, cleanup };
