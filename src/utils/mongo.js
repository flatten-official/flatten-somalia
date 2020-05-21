const { Secret } = require("./networkValues");
const mongoose = require("mongoose");
const { CronJob } = require("cron");
const { removedExpiredCookies } = require("./../verification/cookieData");

const cleanupCookieJob = new CronJob("0 * * * *", removedExpiredCookies);

async function setupDatabase() {
  await connectToDatabase();
  cleanupCookieJob.start();
}

async function cleanupDatabase() {
  cleanupCookieJob.stop();
  await mongoose.disconnect();
}

async function connectToDatabase() {
  const connectionURL = await new Secret(
    process.env.DB_CONNECTION_SECRET_ID
  ).get();

  try {
    await mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log("Failed to connect to database.");
    throw e;
  }

  console.log("Connected to database.");
}

module.exports = { setupDatabase, cleanupDatabase };
