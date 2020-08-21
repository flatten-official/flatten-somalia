const { SurveysByKey } = require("./config");
const { ApiError } = require("../utils/errors");
const { log } = require("util-logging");

module.exports = async (req, res) => {
  const key = req.params.key;
  const surveyConfig = SurveysByKey[key];

  if (!surveyConfig) throw new ApiError("Unknown survey key", 400);

  await surveyConfig.api(
    res.locals.volunteer._id,
    res.locals.volunteer.teamName,
    req.body
  );
  res.sendStatus(200);
  log.info(`Successfully submitted survey (key: ${key}).`, { status: 200 });
};
