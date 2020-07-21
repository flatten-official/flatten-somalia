if (process.env.ENVIRONMENT === "dev") require("dotenv").config();

const MongoDatabase = require("db-utils/externalDb");
const { getApp } = require("./app");
const configFile = require("./config");
const Config = require("util-config");
const SendGrid = require("./utils/sendGrid");

const { log } = require("util-logging");
const removeCookieJob = require("./auth/removeCookieJob");

async function setup() {
  Config.setup(configFile);
  await Config.loadSecrets();
  const mongoUri = Config.getConfig().secrets.mongoUri;
  await MongoDatabase.connect(mongoUri);
  removeCookieJob.start();

  SendGrid.setup();
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

setup()
  .then(startServer)
  .catch(async (e) => {
    log.emergency("Server crashed.", { error: e });
    await cleanup();
  });
