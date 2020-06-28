// Inspired from https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { CONNECTION_OPTIONS } = require("../../src/utils/mongoConnect");

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
async function connectToDatabase() {
  const uri = await mongod.getUri();

  await mongoose.connect(uri, CONNECTION_OPTIONS);
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

module.exports = {
  connectToDatabase,
  clearDatabase,
  closeDatabase,
};
