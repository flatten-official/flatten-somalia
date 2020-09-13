const { Surveys: SharedSurveysConfig } = require("util-shared-constants");

const Surveys = {
  initialHousehold: {
    ...SharedSurveysConfig.initialHousehold,
    legacyMetadata: true, // This property is due to an old definition of the metadata schema
  },
  gravedigger: {
    ...SharedSurveysConfig.gravedigger,
    collectionName: "GravediggerSurveySubmission",
  },
  hospital: {
    ...SharedSurveysConfig.hospital,
    collectionName: "HospitalSurveySubmission",
  },
};

module.exports = { Surveys };
