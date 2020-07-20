module.exports = {
  common: {
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
  },
  envSpecific: {
    dev: {
      secretId:
        "projects/233853318753/secrets/backend-so-config/versions/latest",
      debug: true,
      secureCookies: false,
      urls: {
        frontendHost: "http://localhost:3000",
        backendHost: "http://localhost",
      },
    },
    staging: {
      secretId:
        "projects/233853318753/secrets/backend-so-config/versions/latest",
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
  },
};
