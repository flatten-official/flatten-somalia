const mongoose = require("mongoose");

const isValidationTypeError = (e) =>
  e instanceof mongoose.Error.ValidationError ||
  e instanceof mongoose.Error.StrictModeError;

const createModel = (name, definition) =>
  mongoose.model(name, new mongoose.Schema(definition, { strict: "throw" })); // strict throw doesn't allow extra fields to be silently dropped

module.exports = { createModel, isValidationTypeError };
