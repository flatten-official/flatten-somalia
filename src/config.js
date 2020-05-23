const { getJSONSecret } = require("./utils/secretGCP");

const stagingConfig = {
  secretId: "projects/233853318753/secrets/backend-so-config/versions/latest",
};

const prodConfig = {
  secretId: undefined, // TODO setup
};

let Config = {
  authEmailTemplate: "d-7a10ff414f6d44b882eb9a4dadab16ad",
  loginPage: `${process.env.FRONTEND_DOMAIN}/auth`,
  secrets: {
    sendGridApiKey: undefined,
    cookieSecret: undefined,
    mongoUri: undefined,
    jwtSecret: undefined,
  },
};

const loadSecrets = async () => {
  const secretJson = await getJSONSecret(Config.secretId);

  for (let key in Config.secrets) {
    if (!(key in secretJson))
      throw Error(`Could not find config secret ${key}`);

    Config.secrets[key] = secretJson[key];
  }

  Object.freeze(Config);
};

const setup = async () => {
  // DON'T USE NODE_ENV because on App Engine it is always prod even in the staging environment
  if (
    process.env.ENVIRONMENT === "staging" ||
    process.env.ENVIRONMENT === "dev"
  ) {
    Config = { ...Config, ...stagingConfig };
  } else if (process.env.ENVIRONMENT === "prod") {
    Config = { ...Config, ...prodConfig };
  } else {
    throw Error("Invalid value for ENVIRONMENT");
  }

  await loadSecrets();
};

module.exports = { Config, setup };
