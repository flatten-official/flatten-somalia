const { submitGravediggerSurvey } = require("./submit");

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
  } catch (e) {
    console.log(e);
    // TODO fix dealing with errors
    if (e instanceof Error.ValidationError) {
      console.error(e);
      res.status(400).send("Validation problem with form models.");
    } else throw e;
  }
};
