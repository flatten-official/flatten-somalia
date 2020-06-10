const mongoose = require("mongoose");

const { FormSchema } = require("./types/formSchema");
const { SubmissionMetadata } = require("./types/submissionMetadata");

const GravediggerSurveySubmission = mongoose.model(
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

module.exports = { GravediggerSurveySubmission };
