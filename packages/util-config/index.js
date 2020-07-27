const _ = require("lodash");

let Config = {};

const getEnvironmentConfig = (config, environmentName) => {
  if (!environmentName) return {};

  if (!(environmentName in config.envSpecific))
    throw new Error(
      `Environment ${environmentName} doesn't exist in predefined configs.`
    );

  return config.envSpecific[environmentName];
};

/**
 *  Merges the following configurations with this priority order.
 *  1. overrideConfig: Any additional config that can be specified at runtime.
 *  2. environment specific config. Can be found in configFile.envSpecific.
 *  3. Common or shared config. Can be found in configFile.common.
 *
 *  Assigns the merged config to `Config` which is accessible throughout the codebase with getConfig().
 */
const setup = (
  configFile,
  environmentName = process.env.ENVIRONMENT,
  overrideConfig = {}
) => {
  Config = _.defaultsDeep(
    overrideConfig,
    getEnvironmentConfig(configFile, environmentName),
    configFile.common,
    { environmentName } // Add .environmentName as a value to the configuration
  );
};

module.exports = {
  setup,
  setConfig: (newConfig) => {
    Config = newConfig;
  },
  getConfig: () => Config, // We return a function to compute dynamically since it is set lazily
};
