require("dotenv").config(); // Load .env file

// region Load the config
const Config = require("util-config");
const configFile = require("./config");
Config.setup(configFile); // Do this first since other imports (e.g. logging) make use of config.
// endregion

const { log } = require("util-logging");
const MongoDatabase = require("db-utils/externalDb");
const Confirm = require("prompt-confirm");
const GCP = require("util-gcp");

const main = async () => {
  // Get the script
  const Script = require(process.cwd() + "/" + process.argv[2]);

  // Prompt the user
  const accepted = await new Confirm(Script.confirmationMessage).run();

  if (!accepted) {
    log.info("Script was cancelled.");
    return;
  }

  // Load the secrets from GCP
  await GCP.loadSecretsIntoConfig();

  // Connect to the database
  await MongoDatabase.connect(Config.getConfig().secrets.mongoUri);

  log.info(`Running script.`);

  // Run the script
  await Script.run(...Script.arguments); // runs the script

  log.info(`Done running script. Running success tests...`);

  // Run the success tests
  await Script.successTest(...Script.arguments);

  log.info("Done running success tests");
};

main()
  .catch((e) => {
    log.error("Script threw error:", { error: e });
  })
  .finally(MongoDatabase.disconnect);
