const mongoose = require("mongoose");

const isValidationTypeError = (e) =>
  e instanceof mongoose.Error.ValidationError ||
  e instanceof mongoose.Error.StrictModeError;

const createDocument = async (model, content) => {
  // create survey record from submissionInitial models + death record IDs
  const submissionDocument = new model(content);

  await submissionDocument.validate();

  return submissionDocument;
};

const createModel = (name, definition) =>
  mongoose.model(name, new mongoose.Schema(definition, { strict: "throw" }));

module.exports = {
  createModel,
  createDocument,
  isValidationTypeError,
};
