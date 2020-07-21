module.exports = {
  envSpecific: {
    staging: {
      secretId:
        "projects/233853318753/secrets/backend-so-config/versions/latest",
      secrets: {
        mongoUri: null,
      },
    },
    production: {
      secrets: {
        mongoUri: process.env.MONGO_URI,
      },
    },
  },
};
