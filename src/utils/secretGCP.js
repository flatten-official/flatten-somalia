const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const { getLogger } = require("../winston");

const smClient = new SecretManagerServiceClient();

module.exports.getJSONSecret = async (secretId) => {
  try {
    const [version] = await smClient.accessSecretVersion({ name: secretId });

    return JSON.parse(version.payload.data.toString());
  } catch (e) {
    getLogger().debug(
      `Could not read GCP secret ${secretId}.
       1. Check that you have the proper permissions.
       2. Run gcloud auth login and gcloud auth application-default login.
       3. Run gcloud config set project PROJECT_ID.\n`
    );
    console.trace();
    throw e;
  }
};
