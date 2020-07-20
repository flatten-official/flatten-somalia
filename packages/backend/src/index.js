if (process.env.ENVIRONMENT === "dev") require("dotenv").config();

const MongoDatabase = require("db-utils/externalDb");
const { getApp } = require("./app");
const { setup: configSetup, getConfig } = require("./config");
const { setup: sendGridSetup } = require("./utils/sendGrid");

const { log } = require("util-logging");
const removeCookieJob = require("./auth/removeCookieJob");

async function setup() {
  await configSetup();

  const mongoUri = getConfig().secrets.mongoUri;
  await MongoDatabase.connect(mongoUri);
  removeCookieJob.start();

  sendGridSetup();
}

async function startServer() {
  const port = process.env.PORT || 80;

  const app = await getApp();
  app.listen(port, () => {
    log.notice(`Listening on port ${port}.`, { port });
  });
}

async function cleanup() {
  removeCookieJob.stop();
  await MongoDatabase.disconnect();
}

setup().then(startServer).finally(cleanup);
