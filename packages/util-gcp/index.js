const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const { log } = require("util-logging");
const { getConfig, setConfig } = require("util-config");

const getJSONSecret = async (secretId) => {
  const smClient = new SecretManagerServiceClient();

  try {
    const [version] = await smClient.accessSecretVersion({ name: secretId });

    return JSON.parse(version.payload.data.toString());
  } catch (e) {
    log.error(
      `Could not read GCP secret ${secretId}.
       1. Check that you have the proper permissions.
       2. Run "yarn auth" in the root directory`,
      { error: e }
    );
    throw e;
  }
};

/**
 * If the config has a `secretId` specified,
 * all variables under the `secrets` property will be replaced by the value in the GCP Secret Manager.
 */
const loadSecretsIntoConfig = async () => {
  const config = getConfig();

  if (!config.secretId) return;

  const secretJson = await getJSONSecret(config.secretId);

  for (const key in config.secrets) {
    // eslint-disable-next-line no-prototype-builtins
    if (config.secrets.hasOwnProperty(key)) {
      if (!(key in secretJson))
        throw Error(`Could not find config secret ${key}`);

      config.secrets[key] = secretJson[key];
    }
  }

  setConfig(config);
};

module.exports = {
  loadSecretsIntoConfig,
  getJSONSecret,
};
