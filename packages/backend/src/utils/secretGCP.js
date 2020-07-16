const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const { log } = require("util-logging");

module.exports.getJSONSecret = async (secretId) => {
  const smClient = new SecretManagerServiceClient();

  try {
    const [version] = await smClient.accessSecretVersion({ name: secretId });

    return JSON.parse(version.payload.data.toString());
  } catch (e) {
    log.debug(
      `Could not read GCP secret ${secretId}.
       1. Check that you have the proper permissions.
       2. Run "yarn auth" in the root directory`,
      { error: e }
    );
    throw e;
  }
};
