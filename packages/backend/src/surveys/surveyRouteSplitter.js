const { Surveys } = require("./config");
const { ApiError } = require("../utils/errors");
const { submitGravediggerSurvey } = require("./gravedigger/api");
const { submitHospitalSurvey } = require("./hospital/api");
const { initialSubmission } = require("./initialHousehold/api");
const { log } = require("util-logging");

// Mapping can't be moved to config due to circular dependency (config -> api -> schema -> config)
const surveyKeyToApiMap = {
  [Surveys.gravedigger.key]: submitGravediggerSurvey,
  [Surveys.hospital.key]: submitHospitalSurvey,
  [Surveys.initialHousehold.key]: initialSubmission,
};

module.exports = async (req, res) => {
  const key = req.params.key;
  const submitApi = surveyKeyToApiMap[key];

  if (!submitApi) throw new ApiError(`Unknown survey key: ${key}`, 400);

  await submitApi(
    res.locals.volunteer._id,
    res.locals.volunteer.teamName,
    req.body
  );
  res.sendStatus(200);
  log.info(`Successfully submitted survey (key: ${key}).`, { status: 200 });
};
