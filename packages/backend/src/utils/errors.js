const mongoose = require("db-utils");

class BadInputError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadInputError";
  }
}

const isValidationTypeError = (e) =>
  e instanceof mongoose.Error.ValidationError ||
  e instanceof mongoose.Error.StrictModeError ||
  e instanceof BadInputError;

module.exports = { BadInputError, isValidationTypeError };
