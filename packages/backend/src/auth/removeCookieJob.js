const { CronJob } = require("cron");
const { removedExpiredCookies } = require("./cookieData");

const cleanupCookieJob = new CronJob("0 * * * *", removedExpiredCookies); // TODO test if this actually works

module.exports = cleanupCookieJob;
