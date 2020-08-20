const { Surveys } = require("util-shared-constants");
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

const create = async (content) => {
  const submissionDocument = new model(content);
  await submissionDocument.validate();
  return submissionDocument;
};

const saveAsync = (document) => document.save();

module.exports = { model, saveAsync, create };
