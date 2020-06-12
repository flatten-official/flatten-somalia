const mongoose = require("mongoose");

const FormSchema = {
  form: { type: String, index: true, required: true }, // eg. 'somaliaInitialVolunteerSurvey'
  version: { type: String, index: true, required: true }, // eg. '1.0.0'
};

const SubmissionMetadata = {
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
  location: {
    lat: Number,
    lng: Number,
    accuracy: Number,
    altitude: Number,
    wasManual: Boolean,
  },
  // recorded on the user's browser with JS Date.now()
  endTime: { type: Number, index: true },
  timeToComplete: Number, // ms
  uploadTimestamp: {
    type: Date,
    index: true,
    required: true,
    default: Date.now,
  },
  consentGiven: { type: String, required: true },
};

module.exports = { FormSchema, SubmissionMetadata };
