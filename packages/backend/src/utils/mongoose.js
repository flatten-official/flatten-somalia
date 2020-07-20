const mongoose = require("db-utils");

const createModel = (name, definition) =>
  mongoose.model(name, new mongoose.Schema(definition, { strict: "throw" })); // strict throw doesn't allow extra fields to be silently dropped

const runOpWithinTransaction = async (operations) => {
  if (process.env.DISABLE_TRANSACTIONS) {
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

module.exports = { createModel, runOpWithinTransaction };
