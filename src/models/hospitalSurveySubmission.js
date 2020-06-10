const mongoose = require("mongoose");

const HospitalSurvey = mongoose.model(
  "HospitalSurvey",
  new mongoose.Schema({
    addedBy: {
      type: mongoose.ObjectId,
      required: true,
      index: true,
    },
    teamName: {
      type: String,
      required: true,
      index: true,
    },
    submissionSchema: {
      form: { type: String, index: true, required: true }, // eg. 'somaliaInitialVolunteerSurvey'
      version: { type: String, index: true, required: true }, // eg. '1.0.0'
    },
    metadata: {
      // contains location etc
      location: {
        lat: Number,
        lng: Number,
        accuracy: Number,
        altitude: Number,
        wasManual: Boolean,
      },
      // recorded on the user's browser with JS Date.now()
      filledOutTimestamp: { type: Number, index: true },
      timeToComplete: Number, // ms
      uploadTimestamp: {
        type: Date,
        index: true,
        required: true,
        default: Date.now,
      },
    },
    surveyData: {
      contactPhoneNumber: String,
      contactEmail: String,
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

module.exports = { HospitalSurvey };
