const { submitHospitalSurvey } = require("./api");
const { isValidationTypeError } = require("../../utils/errors");
const { log } = require("util-logging");

module.exports = async (req, res) => {
  try {
    await submitHospitalSurvey(
      res.locals.volunteer._id,
      res.locals.volunteer.teamName,
      req.body.schema,
      req.body.metadata,
      req.body.data
    );
    res.sendStatus(200);
    log.info("Successfully submitted hospital survey.", { status: 200 });
  } catch (e) {
    if (isValidationTypeError(e)) {
      res.status(400).send("Validation problem with form models. ");
      log.error("Failed to submit hospital survey.", {
        error: e,
        status: 400,
      });
    } else throw e;
  }
};