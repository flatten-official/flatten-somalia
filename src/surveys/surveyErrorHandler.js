const { isValidationTypeError } = require("../utils/errors");
const { log } = require("../utils/winston");

// need to keep unused parameter to force function to be an error handler
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (isValidationTypeError(err)) {
    res.status(400).send("Validation problem with form models.");
    log.error("Failed to submit survey.", {
      error: err,
      status: 400,
    });
  } else throw err;
};
