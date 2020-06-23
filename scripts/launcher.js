require("dotenv").config(); // Load .env file
const { setup, cleanup } = require("../src/index");

const scriptName = process.env.SCRIPT_NAME;
const scriptPath = require("./scriptPaths.json")[scriptName];
const Confirm = require("prompt-confirm");

const main = async () => {
  console.log(`Starting script: ${scriptName}`);

  if (!scriptPath)
    throw "no valid SCRIPT_NAME specified in .env file. Look at scripts/scriptPaths.js for valid script names";

  const Script = require(scriptPath);

  const confirmationPrompt = new Confirm(Script.getConfirmationMessage());
  const accepted = await confirmationPrompt.run();

  if (!accepted) {
    console.log("Script was cancelled.");
    return;
  }

  if (Script.Config.useAutoSetup) {
    await setup({
      config: true,
      database: true,
      sendGrid: false,
    });
  }

  await Script.run(); // runs the script

  if (Script.Config.useAutoSetup) await cleanup();

  console.log(
    `Done script: ${scriptName}. MANUALLY VERIFY THAT ALL WENT WELL.`
  );
};

main();
