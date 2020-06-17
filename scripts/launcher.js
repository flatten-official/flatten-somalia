require("dotenv").config(); // Load .env file
const { setup, cleanup } = require("../src/index");

const scriptName = process.env.SCRIPT_NAME;
const scriptPath = require("./scriptPaths.json")[scriptName];

if (!scriptPath)
  throw "no valid SCRIPT_NAME specified in .env file. Look at scripts/scriptPaths.js for valid script names";

console.log(`Starting script: ${scriptName}`);

const runScript = async () => {
  const Script = require(scriptPath);

  if (Script.Config.useAutoSetup) {
    await setup({
      config: true,
      database: true,
      sendGrid: false,
    });
  }

  await Script.run(); // runs the script

  if (Script.Config.useAutoSetup) await cleanup();
};

runScript()
  .then(() => console.log(`Done script: ${scriptName}`))
  .catch((e) => {
    console.log("Script threw error: ");
    console.error(e);
  });
