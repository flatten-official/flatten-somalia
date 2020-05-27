const mongoose = require("mongoose");

// DO NOT MODIFY SCHEMA/MODEL UNLESS YOU KNOW WHAT YOU'RE DOING
const Submission = mongoose.model(
  "Submission",
  new mongoose.Schema({
    // volunteer who made the submsision
    addedBy: {
      type: mongoose.ObjectId,
      required: true,
      index: true,
    },
    // form schema version (the thing contained in the data object)
    schema: {
      form: { type: String, index: true, required: true }, // eg. 'somaliaInitialVolunteerSurvey'
      version: { type: String, index: true, required: true }, // eg. '1.0'
    },
    // contains location etc
    location: {
      lat: Number,
      long: Number,
      accuracy: Number,
      altitude: Number,
      wasManual: Boolean,
    },
    // recorded on the user's browser with JS Date.now()
    filledOutTimestamp: { type: Number, index: true },
    timeToComplete: Number, // ms
    consentGiven: Boolean,
    uploadTimestamp: {
      type: Date,
      index: true,
    },
    // this is filled in when this submission has been followed up with
    // submission -> household
    followUpId: {
      type: mongoose.ObjectId,
      required: false,
    },
  })
);

const Household = mongoose.model(
  "Household",
  new mongoose.Schema({
    submissions: [
      {
        // raw submission data (excluding people and death data)
        data: {
          type: mongoose.Mixed,
        },
        submissionRef: {
          type: mongoose.ObjectId,
          ref: "Submission",
          index: true,
        },
      },
    ],
    // TODO - decide if we remove this
    latestPhone: String,
    latestEmail: String,
    // the id that is given to volunteers (NOT the ID in the DB), TODO...!!
    publicId: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
  })
);

const Person = mongoose.model(
  "Person",
  new mongoose.Schema({
    submissions: [
      {
        data: {
          type: mongoose.Mixed,
        },
        submissionKind: {
          type: String,
          enum: ["person", "death"],
        },
        submissionRef: { type: mongoose.ObjectId, ref: "Submission" },
      },
    ],
    // todo - is there an easy way to query on the latest submission kind
    // or if there is a kind that is death in the list
    isAlive: {
      type: Boolean,
      required: true,
      index: true,
      default: true,
    },
    householdId: {
      type: mongoose.ObjectId,
      required: true,
    },
  })
);

// todo - is there a way to queue up the operations

async function addSubmission(
  submissionData, // break up into the sub components of a submission
  previousId = undefined
) {}

async function addHousehold(submissionData, submissionId) {}

async function addPerson() {}

async function addSubmissionToHousehold(householdId, newSubmission) {}
async function addSubmissionToPerson(personId, newSubmission) {}



module.exports = {
  householdInitialSubmission,
  getDataByVolunteer,
  getHouseholdByHouseholdId,
};
