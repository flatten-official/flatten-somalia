const { mongoose, useReplicaSet } = require("util-db");

// enforce strict: throw to stop extra fields from being silently dropped
const createSchema = (definition) =>
  new mongoose.Schema(definition, { strict: "throw" });

const createModel = (name, definition) =>
  mongoose.model(name, createSchema(definition));

const runOpWithinTransaction = async (operations) => {
  if (!useReplicaSet) {
    await operations();
  } else {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      await operations(session);
      await session.commitTransaction();
    } catch (e) {
      await session.abortTransaction();
      session.endSession();

      throw e;
    }
  }
};

module.exports = { createSchema, createModel, runOpWithinTransaction };
