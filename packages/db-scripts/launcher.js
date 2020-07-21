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
  const scriptName = process.env.SCRIPT_NAME;

  const scriptPath = require("./scriptPaths.json")[scriptName];

  if (!scriptPath)
    throw new Error(
      "no valid SCRIPT_NAME specified in .env file. Look at scriptPaths.js for valid script names"
    );

  const Script = require(scriptPath);

  const accepted = await new Confirm(Script.confirmationMessage).run();

  if (!accepted) {
    log.info("Script was cancelled.");
    return;
  }

  await GCP.loadSecretsIntoConfig();
  await MongoDatabase.connect(Config.getConfig().secrets.mongoUri);

  log.info(`Running script: ${scriptName}`);

  await Script.run(...Script.arguments); // runs the script

  log.info(`Done script: ${scriptName}. MANUALLY VERIFY THAT ALL WENT WELL.`);
};

main()
  .catch((e) => {
    log.error("Script threw error:", { error: e });
  })
  .finally(MongoDatabase.disconnect);
