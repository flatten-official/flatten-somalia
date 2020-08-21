const { Surveys } = require("../config");
const { FormSchema, getSubmissionMetadata } = require("../sharedDataSchemas");
const Util = require("../../utils/mongoose");

const model = Util.createModel("GravediggerSurveySubmission", {
  metadata: getSubmissionMetadata(Surveys.gravedigger),
  surveyData: {
    submissionSchema: FormSchema,
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
