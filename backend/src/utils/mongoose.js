const mongoose = require("backend/src/utils/mongoose");

const createModel = (name, definition) =>
  mongoose.model(name, new mongoose.Schema(definition, { strict: "throw" })); // strict throw doesn't allow extra fields to be silently dropped

const runOpWithinTransaction = async (operations) => {
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
};

module.exports = { createModel, runOpWithinTransaction };
