const YAML = require("yaml");
const fs = require("fs");

function loadConfig() {
  const file = fs.readFileSync("./config.yaml", "utf8");
  let config = YAML.parse(file);
  detectProject(config);
  return config;
}

function detectProject(config) {
  if (process.env.PROJECT_ID === config.project_id_master) {
    for (let [key, value] of Object.entries(config.master)) {
      config[key] = value;
    }
  } else {
    for (let [key, value] of Object.entries(config.staging)) {
      config[key] = value;
    }
  }
}

module.exports = { loadConfig };
