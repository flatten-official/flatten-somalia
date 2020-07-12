// Inspired from https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np
const mongoose = require("mongoose");
const { MongoMemoryReplSet } = require("mongodb-memory-server");
const { CONNECTION_OPTIONS } = require("backend/src/utils/mongoConnect");
const { log } = require("util-logging");

const DB_NAME = "test";

const mongod = new MongoMemoryReplSet({
  replSet: { storageEngine: "wiredTiger" }, // https://github.com/nodkz/mongodb-memory-server#replica-set-start
});

/**
 * Connect to the in-memory database.
 */
async function connectToDatabase() {
  log.debug("Connecting to database...");
  await mongod.waitUntilRunning();
  const uri = await mongod.getUri(DB_NAME);

  await mongoose.connect(uri, CONNECTION_OPTIONS);
  await sleep(1000); // Required to avoid connection issues see https://stackoverflow.com/a/54445580/5864903
  log.debug("Connected to database.");
}

/**
 * Drop database, close the connection and stop mongod.
 */
async function closeDatabase() {
  await mongoose.disconnect();
  await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
async function clearDatabase() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  connectToDatabase,
  clearDatabase,
  closeDatabase,
};
