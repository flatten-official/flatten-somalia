const mongoose = require("mongoose");
const { CronJob } = require("cron");
const { removedExpiredCookies } = require("../auth/cookieData");
const { getConfig } = require("../config");

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
  console.log("Disconnected from database");
}

async function connectToDatabase() {
  const mongoURI = getConfig().secrets.mongoUri;

  if (!mongoURI) throw Error("No connection URI specified");

  try {
    await mongoose.connect(mongoURI, CONNECTION_OPTIONS);
  } catch (e) {
    console.log("Failed to connect to database." + e);
    throw e;
  }

  console.log("Connected to database.");
}

module.exports = { setupDatabase, cleanupDatabase, CONNECTION_OPTIONS };
