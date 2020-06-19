const { submitGravediggerSurvey } = require("./api");

module.exports = async (req, res) => {
  await submitGravediggerSurvey(
    res.locals.volunteer._id,
    res.locals.volunteer.teamName,
    req.body.schema,
    req.body.metadata,
    req.body.data
  );
  res.sendStatus(200);
};
