const { FormSchema, getSubmissionMetadata } = require("../sharedDataSchemas");
const { createModel } = require("../../utils/mongoose");

const model = createModel("initialBRASurveySubmission", {
  metadata: getSubmissionMetadata(true),
  surveyData: {
    submissionSchema: FormSchema,
  },
});

const create = async (content) => {
  const submissionDocument = new model(content);
  await submissionDocument.validate();
  return submissionDocument;
};

const saveAsync = (document) => document.save();

module.exports = { model, saveAsync, create };
