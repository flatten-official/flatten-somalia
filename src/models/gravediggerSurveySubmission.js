const mongoose = require("mongoose");

const { FormSchema } = require("./types/formSchema");
const { SubmissionMetadata } = require("./types/submissionMetadata");

const model = mongoose.model(
  "GravediggerSurveySubmission",
  new mongoose.Schema({
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
  })
);

async function save(document) {
  await document.save();
}

module.exports = { model, save };
