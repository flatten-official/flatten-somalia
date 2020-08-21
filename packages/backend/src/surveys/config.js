const { Surveys: SharedSurveys } = require("util-shared-constants");
const { submitGravediggerSurvey } = require("./gravedigger/api");
const { submitHospitalSurvey } = require("./hospital/api");
const { initialSubmission } = require("./initialHousehold/api");

const Surveys = {
  initialHousehold: {
    ...SharedSurveys.initialHousehold,
    api: initialSubmission,
  },
  gravedigger: {
    ...SharedSurveys.gravedigger,
    api: submitGravediggerSurvey,
  },
  hospital: {
    ...SharedSurveys.hospital,
    api: submitHospitalSurvey,
  },
};

// Same as Surveys but the keys are the survey.key values. Useful for lookups
const SurveysByKey = Object.values(Surveys).reduce((surveysByKey, survey) => {
  surveysByKey[survey.key] = survey;
  return surveysByKey;
}, {});

module.exports = { Surveys, SurveysByKey };
