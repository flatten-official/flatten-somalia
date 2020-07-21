const _ = require("lodash");

let Config;

const getEnvironmentConfig = (config, environmentName) => {
  if (!environmentName) return {};

  if (!(environmentName in config.envSpecific))
    throw new Error(
      `Environment ${environmentName} doesn't exist in predefined configs.`
    );

  return config.envSpecific[environmentName];
};

const setup = (
  configFile,
  environmentName = process.env.ENVIRONMENT,
  overrideConfig = {}
) => {
  Config = _.defaultsDeep(
    overrideConfig,
    getEnvironmentConfig(configFile, environmentName),
    configFile.common
  );
};

module.exports = {
  setup,
  setConfig: (newConfig) => {
    Config = newConfig;
  },
  getConfig: () => Config, // We return a function to compute dynamically since it is set lazily
};
