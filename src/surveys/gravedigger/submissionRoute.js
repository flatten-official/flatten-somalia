const { submitGravediggerSurvey } = require("./api");
const { isValidationTypeError } = require("../dataUtil");

module.exports = async (req, res) => {
  console.log(req.body);
  try {
    await submitGravediggerSurvey(
      res.locals.volunteer._id,
      res.locals.volunteer.teamName,
      req.body.schema,
      req.body.metadata,
      req.body.data
    );
    res.sendStatus(200);
  } catch (e) {
    if (isValidationTypeError(e)) {
      console.error(e);
      res.status(400).send("Validation problem with form models.");
    } else throw e;
  }
};
