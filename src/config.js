const { getJSONSecret } = require("./utils/secretGCP");

// DON'T USE NODE_ENV because on App Engine it is always prod even in the staging environment
const environment = process.env.ENVIRONMENT;

const devConfig = {
  secretId: "projects/233853318753/secrets/backend-so-config/versions/latest",
  debug: true,
};

const stagingConfig = {
  secretId: "projects/233853318753/secrets/backend-so-config/versions/latest",
  debug: false,
};

const prodConfig = {
  secretId: null, // TODO setup
  debug: false,
};

const SharedConfig = {
  authEmailTemplate: "d-7a10ff414f6d44b882eb9a4dadab16ad",
  urls: {
    loginPage: `${process.env.FRONTEND_URL}/auth`,
    homePage: `${process.env.FRONTEND_URL}`,
    emailLink: `${process.env.BACKEND_URL}/auth/token`,
  },
  secrets: {
    sendGridApiKey: undefined,
    cookieSecret: undefined,
    mongoUri: undefined,
    jwtSecret: undefined,
  },
};

const buildConfig = () => {
  switch (environment) {
    case "dev":
      return { ...SharedConfig, ...devConfig };
    case "staging":
      return { ...SharedConfig, ...stagingConfig };
    case "production":
      return { ...SharedConfig, ...prodConfig };
    default:
      throw Error(`Invalid value for ENVIRONMENT: ${environment}`);
  }
};

const Config = buildConfig();

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

  Object.freeze(Config);
};

module.exports = { Config, setup: () => loadSecrets() };
