require("dotenv").config(); // Load .env file
const { setup, cleanup } = require("../src/index");
const { log } = require("../src/utils/winston");

const scriptName = process.env.SCRIPT_NAME;
const scriptPath = require("./scriptPaths.json")[scriptName];
const Confirm = require("prompt-confirm");

const main = async () => {
  log.info(`Starting script: ${scriptName}`);

  if (!scriptPath)
    throw "no valid SCRIPT_NAME specified in .env file. Look at scripts/scriptPaths.js for valid script names";

  const Script = require(scriptPath);

  const accepted = await new Confirm(Script.confirmationMessage).run();

  if (!accepted) {
    log.info("Script was cancelled.");
    return;
  }

  if (Script.useAutoSetup) {
    await setup({
      config: true,
      database: true,
      sendGrid: false,
    });
  }

  try {
    await Script.run(...Script.arguments); // runs the script
  } finally {
    if (Script.useAutoSetup) await cleanup();
  }

  log.info(`Done script: ${scriptName}. MANUALLY VERIFY THAT ALL WENT WELL.`);
};

main().catch((e) => {
  log.error("Script threw error:", { error: e });
});
