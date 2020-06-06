const { getJSONSecret } = require("./utils/secretGCP");
const _ = require("lodash");

const sharedConfig = {
  authEmailTemplate: "d-7a10ff414f6d44b882eb9a4dadab16ad",
  urls: {
    loginPage: "/auth",
    emailLink: "/auth/token",
  },
  secrets: {
    // Null secrets get replaced by the secret manager if a secretId is specified
    sendGridApiKey: null,
    cookieSecret: null,
    mongoUri: null,
    jwtSecret: null,
  },
};

const environmentSpecificConfig = {
  dev: {
    secretId: "projects/233853318753/secrets/backend-so-config/versions/latest",
    debug: true,
    secureCookies: false,
    urls: {
      frontendHost: "http://localhost:3000",
      backendHost: "http://localhost",
    },
  },
  staging: {
    secretId: "projects/233853318753/secrets/backend-so-config/versions/latest",
    debug: false,
    secureCookies: true,
    urls: {
      frontendHost: "https://v.staging.flatten.org",
      backendHost: "https://api.staging.flatten.org",
    },
  },
  production: {
    secretId:
      "projects/915444252630/secrets/backend-gae-config-so/versions/latest",
    debug: false,
    secureCookies: true,
    urls: {
      frontendHost: "https://v.flatten.org",
      backendHost: "https://api.flatten.org",
    },
  },
  test: {
    debug: false,
    secureCookies: false,
    urls: {
      frontendHost: "http://localhost:3000",
      backendHost: "http://localhost",
    },
    secrets: {
      cookieSecret: "8H!5bf2fKOB18*Aq", // not important since only used in testing
      jwtSecret: "sa6mSrM8cs&70*Dy", // not important since only used in testing
    },
  },
};

const buildConfig = (customConfig = {}) => {
  // DON'T USE NODE_ENV because on App Engine it is always prod even in the staging environment
  const environmentConfig = environmentSpecificConfig[process.env.ENVIRONMENT];

  if (!environmentConfig)
    throw `Ensure you properly set the ENVIRONMENT env variable (${process.env.ENVIRONMENT})`;

  return _.defaultsDeep(customConfig, environmentConfig, sharedConfig);
};

let Config = buildConfig(); // Set during setup() is called

const getConfig = () => Config;

const loadSecrets = async () => {
  if (!getConfig().secretId) return; // Include null check since some scripts override this property to null

  const secretJson = await getJSONSecret(getConfig().secretId);
  for (const key in getConfig().secrets) {
    // eslint-disable-next-line no-prototype-builtins
    if (getConfig().secrets.hasOwnProperty(key)) {
      if (!(key in secretJson))
        throw Error(`Could not find config secret ${key}`);

      getConfig().secrets[key] = secretJson[key];
    }
  }
};

const setup = async (customConfig) => {
  Config = buildConfig(customConfig);
  await loadSecrets();
  Object.freeze(Config);
};

module.exports = { getConfig, setup };
