const modelFactory = require("../defaultSurveyFactory/dataModelFactory");
const { Surveys } = require("../config");

module.exports = modelFactory(Surveys.hospital, {
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
});
