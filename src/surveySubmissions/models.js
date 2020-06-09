const mongoose = require("mongoose");

const GravediggerSurvey = mongoose.model(
  "GravediggerSurvey",
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
      gravediggerPhoneNumber: {},
      gravediggerEmail: {},
      gravesite: {},
      burialsThatDay: {},
      deaths: [mongoose.Types.ObjectId],
    },
  })
);

const GravediggerDeathRecord = mongoose.model(
  "GravediggerDeathRecord",
  new mongoose.Schema({
    sex: String,
    age: Number,
    dateOfDeath: String,
    gravesite: String,
    causeOfDeath: String,
    comorbidities: Object,
    symptomsBeforeDeath: Object,
  })
);

module.exports = { GravediggerSurvey, GravediggerDeathRecord };
