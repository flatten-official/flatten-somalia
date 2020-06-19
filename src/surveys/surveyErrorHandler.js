const { isValidationTypeError } = require("./dataUtil");

// need to keep unused parameter to force function to be an error handler
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (isValidationTypeError(err)) {
    console.error(err);
    res.status(400).send("Validation problem with form models.");
  } else throw err;
};
