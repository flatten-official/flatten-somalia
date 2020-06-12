const mongoose = require("mongoose");

const { FormSchema, SubmissionMetadata } = require("../sharedModels");
const Util = require("../databaseUtil");

const model = Util.createModel("GravediggerSurveySubmission", {
  metadata: SubmissionMetadata,
  surveyData: {
    submissionSchema: FormSchema,
    gravesite: {
      type: String,
      required: true,
      index: true,
    },
    gravediggerPhoneNumber: String,
    gravediggerEmail: String,
    burialsThatDay: {
      type: Number,
      required: true,
    },
    deaths: [mongoose.Types.ObjectId],
  },
});

const create = async (content) => {
  const submissionDocument = new model(content);
  await submissionDocument.validate();
  return submissionDocument;
};

const save = async (document) => await document.save();

module.exports = { model, save, create };
