const { FormSchema, SubmissionMetadata } = require("../sharedModels");
const Util = require("../databaseUtil");

const model = Util.createModel("HospitalSurveySubmission", {
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
});

const create = async (content) => Util.createDocument(model, content);

const save = async (document) => await document.save();

module.exports = { model, save, create };
