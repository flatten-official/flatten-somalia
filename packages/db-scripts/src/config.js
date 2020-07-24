module.exports = {
  common: {
    secrets: {
      mongoUri: null,
    },
  },
  envSpecific: {
    test: {
      allowDisableTransactions: true,
    },
    staging: {
      secretId:
        "projects/233853318753/secrets/backend-so-config/versions/latest",
    },
    "test-db": {
      secretId:
        "projects/915444252630/secrets/db-script-testing-atlas-db/versions/latest",
    },
    production: {
      secretId:
        "projects/915444252630/secrets/db-scripts-production-atlas/versions/latest",
    },
  },
};
