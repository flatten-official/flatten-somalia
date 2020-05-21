// Inspired from https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongod = new MongoMemoryServer();

const ValidationError = mongoose.Error.ValidationError;

/**
 * Connect to the in-memory database.
 */
async function connectToDatabase() {
  const uri = await mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
}

/**
 * Drop database, close the connection and stop mongod.
 */
async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
async function clearDatabase() {
  await mongoose.connection.dropDatabase();
}

module.exports = { ValidationError, connectToDatabase, clearDatabase, closeDatabase };
