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
      form: { type: String, index: true, required: true },
      version: { type: String, index: true, required: true },
    },
    // raw submission data eg from formio
    data: {
      type: mongoose.Mixed,
      required: true,
    },
    // contains location etc
    meta: {
      location: {
        lat: Number,
        long: Number,
        accuracy: Number,
        altitude: Number,
      },
      startTime: { type: Number, index: true },
      endTime: { type: Number, index: true },
      timeToComplete: Number,
      consentGiven: Boolean,
      timestamp: {
        type: Date,
        index: true,
      },
    },
  })
);

const Household = mongoose.model(
  "Household",
  new mongoose.Schema({
    // volunteer who made the submsision
    addedBy: {
      type: mongoose.ObjectId,
      required: true,
      index: true,
    },
    submissions: [{ type: mongoose.ObjectId, ref: "Submission" }],
    latestPhone: String,
    latestEmail: String,
    // the id that is given to volunteers (NOT the ID in the DB)
    householdId: {
      type: String,
      required: true,
    },
  })
);

const Person = mongoose.model(
  "Person",
  new mongoose.Schema({
    submissions: [{ type: mongoose.ObjectId, ref: "Submission" }],
    basicInfo: {
      firstName: String,
      lastName: String,
      yearOfBirth: Number,
      gender: {
        type: String,
        enum: [
          // todo - what is the correct way to ask this stuff!
          "male",
          "female",
          "preferNotToAnswer",
          "unlisted",
        ],
      },
      isAlive: {
        type: Boolean,
        required: true,
        index: true,
        default: true,
      },
    },
    householdId: {
      type: mongoose.ObjectId,
      required: true,
    },
  })
);

async function householdInitialSubmission(
  volunteerId,
  schema,
  householdData,
  peopleData,
  deathData,
  submissionMetadata
) {}

async function getDataByVolunteer(volunteerId) {}

async function getHouseholdByHouseholdId(householdId) {}

module.exports = {
  householdInitialSubmission,
  getDataByVolunteer,
  getHouseholdByHouseholdId,
};
