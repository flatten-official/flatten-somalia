const log = require("winston");
const { submitGravediggerSurvey } = require("./api");
const { isValidationTypeError } = require("../dataUtil");

module.exports = async (req, res) => {
  try {
    await submitGravediggerSurvey(
      res.locals.volunteer._id,
      res.locals.volunteer.teamName,
      req.body.schema,
      req.body.metadata,
      req.body.data
    );
    res.sendStatus(200);
    log.verbose("Successfully submitted gravedigger survey.", { status: 200 });
  } catch (e) {
    if (isValidationTypeError(e)) {
      console.error(e);
      res.status(400).send("Validation problem with form models.");
      log.verbose("Validation problem encountered.", { error: e, status: 400 });
    } else throw e;
  }
};
