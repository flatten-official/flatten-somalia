const mongoose = require("mongoose");
const { CronJob } = require("cron");
const { removedExpiredCookies } = require("../auth/cookieData");
const { getConfig } = require("../config");
const { getLogger } = require("../winston");

const CONNECTION_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const cleanupCookieJob = new CronJob("0 * * * *", removedExpiredCookies); // TODO test if this actually works

async function setupDatabase() {
  await connectToDatabase();
  cleanupCookieJob.start();
}

async function cleanupDatabase() {
  cleanupCookieJob.stop();
  await mongoose.disconnect();
  getLogger().notice("Disconnected from database");
}

async function connectToDatabase() {
  try {
    await mongoose.connect(getConfig().secrets.mongoUri, CONNECTION_OPTIONS);
  } catch (e) {
    getLogger().emergency("Failed to connect to database.", { error: e });
    throw e;
  }

  getLogger().notice("Connected to database.");
}

module.exports = { setupDatabase, cleanupDatabase, CONNECTION_OPTIONS };
