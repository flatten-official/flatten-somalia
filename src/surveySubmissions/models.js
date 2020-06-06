const mongoose = require("mongoose");

const graveDiggerSurvey = mongoose.model(
  "gravediggerSurvey",
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
      deaths: [
        {
          ref: {
            type: mongoose.ObjectId,
            ref: "gravediggerDeathRecord",
          },
        },
      ],
    },
  })
);

const gravediggerDeathRecord = mongoose.model(
  "gravediggerDeathRecord",
  new mongoose.Schema({
    sex: String,
    age: Number,
    causeOfDeath: String,
    dateOfDeath: String,
    comorbidities: [String],
    symptoms: [String],
  })
);

module.exports = {
  graveDiggerSurvey,
  gravediggerDeathRecord,
};
