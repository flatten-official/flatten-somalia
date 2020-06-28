const { submitGravediggerSurvey } = require("./api");
const { isValidationTypeError } = require("../../utils/mongoose");
const { log } = require("../../utils/winston");

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
    log.info("Successfully submitted gravedigger survey.", { status: 200 });
  } catch (e) {
    if (isValidationTypeError(e)) {
      log.warning("Failed to submit gravedigger survey. ", {
        error: e,
        status: 400,
      });
      res.status(400).send("Validation problem with form models.");
    } else throw e;
  }
};
