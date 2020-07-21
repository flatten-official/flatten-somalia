require("dotenv").config(); // Load .env file
const { log } = require("util-logging");
const MongoDatabase = require("db-utils/externalDb");
const Config = require("util-config");
const configFile = require("./config");

const scriptName = process.env.SCRIPT_NAME;

const scriptPath = require("../scriptPaths.json")[scriptName];
const Confirm = require("prompt-confirm");

const main = async () => {
  log.info(`Starting script: ${scriptName}`);

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

  Config.setup(configFile);
  await Config.loadSecrets();
  await MongoDatabase.connect(Config.getConfig().secrets.mongoUri);

  await Script.run(...Script.arguments); // runs the script

  log.info(`Done script: ${scriptName}. MANUALLY VERIFY THAT ALL WENT WELL.`);
};

main()
  .catch((e) => {
    log.error("Script threw error:", { error: e });
  })
  .finally(MongoDatabase.disconnect);
