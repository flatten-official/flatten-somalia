const { FormSchema, getSubmissionMetadata } = require("../sharedDataSchemas");
const Util = require("../../utils/mongoose");
const { Surveys } = require("../config");

const model = Util.createModel("HospitalSurveySubmission", {
  metadata: getSubmissionMetadata(Surveys.hospital),
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

const create = async (content) => {
  const submissionDocument = new model(content);
  await submissionDocument.validate();
  return submissionDocument;
};

const saveAsync = (document) => document.save();

module.exports = { model, saveAsync, create };
