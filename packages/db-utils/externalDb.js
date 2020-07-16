const { log } = require("util-logging");
const connectionOptions = require("./connectionOptions");

async function disconnect(mongoose) {
  await mongoose.disconnect();
  log.notice("Disconnected from database");
}

async function connect(mongoose, uri) {
  if (!uri) throw Error("No connection URI specified");

  try {
    await mongoose.connect(uri, connectionOptions);
  } catch (e) {
    log.emergency("Failed to connect to database.", { error: e });
    throw e;
  }

  log.notice("Connected to database.");
}

module.exports = (mongoose) => ({
  connect: (uri) => connect(mongoose, uri),
  disconnect: () => disconnect(mongoose),
});
