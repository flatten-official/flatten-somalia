// Inspired from https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np
const {
  MongoMemoryReplSet,
  MongoMemoryServer,
} = require("mongodb-memory-server");
const { connectionOptions } = require("./index");
const { log } = require("util-logging");
const { mongoose, useReplicaSet } = require("./index");

const DB_NAME = "test";

let mongod;

if (useReplicaSet)
  mongod = new MongoMemoryReplSet({
    replSet: { storageEngine: "wiredTiger" }, // https://github.com/nodkz/mongodb-memory-server#replica-set-start
  });
else {
  mongod = new MongoMemoryServer();
  log.warning("Replica sets are disabled. Some tests may be skipped.");
}

/**
 * Connect to the in-memory database.
 */
async function connect() {
  log.debug("Connecting to database...");
  if (useReplicaSet) await mongod.waitUntilRunning();
  const uri = await mongod.getUri(DB_NAME);

  await mongoose.connect(uri, connectionOptions);
  // required to avoid connection issues. see https://stackoverflow.com/a/54329017
  if (useReplicaSet)
    mongoose.connection.db.admin().command({
      setParameter: 1,
      maxTransactionLockRequestTimeoutMillis: 5000,
    });
  log.debug("Connected to database.");
}

/**
 * Drop database, close the connection and stop mongod.
 */
async function close() {
  await mongoose.disconnect();
  await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
async function clear() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}

module.exports = { connect, clear, close };
