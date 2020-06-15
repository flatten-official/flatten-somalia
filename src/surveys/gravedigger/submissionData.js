const { FormSchema, SubmissionMetadata } = require("../sharedDataSchemas");
const Util = require("../dataUtil");

const model = Util.createModel("GravediggerSurveySubmission", {
  metadata: SubmissionMetadata,
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
    gravediggerEmail: String,
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

const save = async (document) => await document.save();

module.exports = { model, save, create };
