if (process.env.ENVIRONMENT === "dev") require("dotenv").config();

// region Load the config
const Config = require("util-config");
const configFile = require("./config");
Config.setup(configFile); // Do this first since other imports (e.g. logging) make use of config.
// endregion

const MongoDatabase = require("util-db/externalDb");
const { getApp } = require("./app");
const SendGrid = require("./utils/sendGrid");

const { log } = require("util-logging");
const removeCookieJob = require("./auth/removeCookieJob");
const GCP = require("util-gcp");

async function setup() {
  await GCP.loadSecretsIntoConfig();
  const mongoUri = Config.getConfig().secrets.mongoUri;
  await MongoDatabase.connect(mongoUri);
  removeCookieJob.start();

  SendGrid.setup();
}

async function startServer() {
  const port = process.env.BACKEND_PORT || 3000;

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
