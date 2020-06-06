const submissionAPI = require("../surveySubmissions/submissionAPI");

module.exports = async (req, res) => {
  try {
    if (req.body.perDeath === undefined) req.body.perDeath = [];
    await submissionAPI.gravediggerSurveySubmission(
      res.locals.volunteer._id,
      res.locals.volunteer.teamName,
      req.body.schema,
      req.body.metadata,
      req.body.data
    );
    res.sendStatus(200);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      console.error(e);
      res.status(400).send("Validation problem with form data.");
    } else throw e;
  }
};