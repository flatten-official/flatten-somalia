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
    req.log.info("Successfully submitted gravedigger survey.", { status: 200 });
  } catch (e) {
    if (isValidationTypeError(e)) {
      console.error(e);
      res.status(400).send("Validation problem with form models.");
      req.log.info("Failed to submit gravedigger survey.", {
        error: e,
        status: 400,
      });
    } else throw e;
  }
};
