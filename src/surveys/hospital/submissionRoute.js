const { submitHospitalSurvey } = require("./api");

module.exports = async (req, res) => {
  await submitHospitalSurvey(
    res.locals.volunteer._id,
    res.locals.volunteer.teamName,
    req.body.schema,
    req.body.metadata,
    req.body.data
  );
  res.sendStatus(200);
};
