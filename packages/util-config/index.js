const { getJSONSecret } = require("util-gcp");
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

const loadSecrets = async () => {
  const secretJson = await getJSONSecret(Config.secretId);

  for (const key in Config.secrets) {
    // eslint-disable-next-line no-prototype-builtins
    if (Config.secrets.hasOwnProperty(key)) {
      if (!(key in secretJson))
        throw Error(`Could not find config secret ${key}`);

      Config.secrets[key] = secretJson[key];
    }
  }
};

const setup = async (
  configFile,
  environmentName = null,
  overrideConfig = {}
) => {
  Config = _.defaultsDeep(
    overrideConfig,
    getEnvironmentConfig(configFile, environmentName),
    configFile.common
  );

  if (Config.secretId) await loadSecrets();

  Object.freeze(Config);
};

module.exports = {
  getConfig: () => Config, // We return a function to compute dynamically since it is set lazily
  setup,
};
