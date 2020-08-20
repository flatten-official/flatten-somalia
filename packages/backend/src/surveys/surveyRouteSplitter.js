const { Surveys } = require("util-shared-constants");
const { ApiError } = require("../utils/errors");
const { submitGravediggerSurvey } = require("./gravedigger/api");
const { submitHospitalSurvey } = require("./hospital/api");
const { initialSubmission } = require("./initialHousehold/api");
const { log } = require("util-logging");

const getApi = (key) => {
  switch (key) {
    case Surveys.gravedigger.key:
      return submitGravediggerSurvey;
    case Surveys.hospital.key:
      return submitHospitalSurvey;
    case Surveys.initialHousehold.key:
      return initialSubmission;
    default:
      throw new ApiError("Unknown survey key", 400);
  }
};

module.exports = async (req, res) => {
  const key = req.params.key;
  const submitApi = getApi(key);

  await submitApi(
    res.locals.volunteer._id,
    res.locals.volunteer.teamName,
    req.body
  );
  res.sendStatus(200);
  log.info(`Successfully submitted survey (key: ${key}).`, { status: 200 });
};
