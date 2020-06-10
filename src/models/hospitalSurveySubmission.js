const mongoose = require("mongoose");

const { FormSchema } = require("./types/formSchema");
const { SubmissionMetadata } = require("./types/submissionMetadata");

const model = mongoose.model(
  "HospitalSurveySubmission",
  new mongoose.Schema({
    metadata: SubmissionMetadata,
    surveyData: {
      submissionSchema: FormSchema,
      hospitalPhoneNumber: {
        type: String,
        required: true,
        index: true,
      },
      hospitalEmail: String,
      newPatients: Number,
      dischargedPatients: Number,
      occupiedHospitalBeds: Number,
      occupiedCriticalCareBeds: Number,
      availableBeds: Number,
      hospitalizedPatients: Number,
      confirmedCOVID19Cases: Number,
      suspectedCOVID19Cases: Number,
      negativeCOVID19Cases: Number,
    },
  })
);

async function save(document) {
  await document.save();
}

module.exports = { model, save };
