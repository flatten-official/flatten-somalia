const { Surveys } = require("../config");
const { getSubmissionMetadata } = require("../sharedDataSchemas");
const Util = require("../../utils/mongoose");

const model = Util.createModel("GravediggerSurveySubmission", {
  metadata: getSubmissionMetadata(Surveys.gravedigger),
  surveyData: {
    gravesite: {
      type: String,
      required: true,
      index: true,
    },
    gravediggerPhoneNumber: {
      type: String,
      required: true,
    },
    burialsThatDay: {
      type: Number,
      required: true,
    },
  },
});

module.exports = { model };
