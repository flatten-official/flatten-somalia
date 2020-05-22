const { buildSecret } = require("./networkValues");
const mongoose = require("mongoose");
const { CronJob } = require("cron");
const { removedExpiredCookies } = require("../auth/cookieData");

const CONNECTION_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const dbConnectionURL = buildSecret(process.env.DB_CONNECTION_SECRET_ID);

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
  try {
    await mongoose.connect(await dbConnectionURL.get(), CONNECTION_OPTIONS);
  } catch (e) {
    console.log("Failed to connect to database.");
    throw e;
  }

  console.log("Connected to database.");
}

module.exports = { setupDatabase, cleanupDatabase, CONNECTION_OPTIONS };
