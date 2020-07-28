require("dotenv").config(); // Load .env file

// region Load the config
const Config = require("util-config");
const configFile = require("./config");
Config.setup(configFile); // Do this first since other imports (e.g. logging) make use of config.
// endregion

const { log } = require("util-logging");
const MongoDatabase = require("util-db/externalDb");
const Confirm = require("prompt-confirm");
const GCP = require("util-gcp");

const main = async () => {
  // Get the script
  const Script = require("./" + process.argv[2]);

  log.notice(
    `Starting script ${process.argv[2]} in environment ${
      Config.getConfig().environmentName
    }`
  );

  // Prompts to ask the user before continuing
  const prompts = [
    "Did you create a backup (snapshot) of the appropriate database",
    Script.confirmationMessage,
  ];

  for (const prompt of prompts) {
    if (!(await new Confirm(prompt).run())) {
      log.info("Script was cancelled.");
      return;
    }
  }

  // Load the secrets from GCP
  await GCP.loadSecretsIntoConfig();

  // Connect to the database
  await MongoDatabase.connect(Config.getConfig().secrets.mongoUri);

  log.info(`Running script.`);

  // Run the script
  await Script.run(...Script.scriptArguments); // runs the script

  log.info(`Done running script. Running success tests...`);

  // Run the success tests
  await Script.successTest(...Script.scriptArguments);

  log.info("Done running success tests");
};

main()
  .catch((e) => {
    log.error("Script threw error:", { error: e });
  })
  .finally(MongoDatabase.disconnect);
