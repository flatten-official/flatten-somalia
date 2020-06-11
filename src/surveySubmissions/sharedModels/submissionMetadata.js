const mongoose = require("mongoose");

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
  filledOutTimestamp: { type: Number, index: true },
  timeToComplete: Number, // ms
  uploadTimestamp: {
    type: Date,
    index: true,
    required: true,
    default: Date.now,
  },
};

module.exports = { SubmissionMetadata };
