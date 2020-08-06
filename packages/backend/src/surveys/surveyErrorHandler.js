const { isValidationError } = require("../utils/errors");
const { log } = require("util-logging");

// need to keep unused parameter to force function to be an error handler
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (isValidationError(err)) {
    res.status(400).send("Validation problem with form models.");
    log.error("Failed to submit survey.", {
      error: err,
      status: 400,
    });
  } else throw err;
};
