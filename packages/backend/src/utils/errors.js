const { mongoose } = require("util-db");

/**
 * Dealt with by apiErrorHandler, so should be thrown by API route handlers.
 * The message and status code are returned by the API and logged.
 */
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

const isValidationError = (e) =>
  e instanceof mongoose.Error.ValidationError ||
  e instanceof mongoose.Error.StrictModeError;

module.exports = { ApiError, isValidationError };
