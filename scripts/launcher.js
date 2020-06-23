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

  const accepted = await new Confirm(Script.confirmationMessage).run();

  if (!accepted) {
    console.log("Script was cancelled.");
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

  console.log(
    `Done script: ${scriptName}. MANUALLY VERIFY THAT ALL WENT WELL.`
  );
};

main().catch((e) => {
  console.log("Script threw error:");
  console.error(e);
});
