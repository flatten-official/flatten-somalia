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
    teamName: {
      type: String,
      required: true,
      index: true,
    },
    people: [
      {
        // raw submissionInitial models (excluding people and death models)
        data: {
          type: mongoose.Mixed,
          required: true,
        },
        ref: {
          type: mongoose.ObjectId,
          ref: "Person",
          index: true,
          required: true,
        },
      },
    ],
    household: {
      // raw submissionInitial models (excluding people and death models)
      data: {
        type: mongoose.Mixed,
        required: true,
      },
      ref: {
        type: mongoose.ObjectId,
        ref: "Household",
        index: true,
        required: true,
      },
    },
    // form schema version (the thing contained in the models object)
    submissionSchema: {
      // todo - maybe validate these using enums?
      form: { type: String, index: true, required: true }, // eg. 'somaliaInitialVolunteerSurvey'
      version: { type: String, index: true, required: true }, // eg. '1.0'
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
      consentGiven: {
        type: Boolean,
        required: true,
      },
      uploadTimestamp: {
        type: Date,
        index: true,
        required: true,
        default: Date.now,
      },
    },
    // this is filled in when this submissionInitial has been followed up with
    // submissionInitial -> household
    followUp: {
      id: {
        type: mongoose.ObjectId,
        index: true,
      },
      inProgress: {
        type: Boolean,
        index: true,
        default: false,
      },
      startTime: {
        type: Date,
        index: true,
      },
    },
  })
);

const Household = mongoose.model(
  "Household",
  new mongoose.Schema({
    // TODO - decide if we remove this - can we query the latest in the submissions
    phone: String,
    email: String,
    // the id that is given to volunteers (NOT the ID in the DB), TODO...!!
    followUpId: {
      type: String,
      index: true,
      sparse: true,
      unique: true,
    },
  })
);

const Person = mongoose.model(
  "Person",
  new mongoose.Schema({
    name: String,
    gender: String,
    // todo - is there an easy way to query on the latest submissionInitial kind
    // or if there is a kind that is death in the list
    alive: {
      type: Boolean,
      required: true,
      index: true,
      default: true,
    },
    household: {
      type: mongoose.ObjectId,
      ref: "Household",
      required: true,
      index: true,
    },
  })
);

function createPeople(perPersonData) {
  return perPersonData.map((personData) => new Person(personData));
}

function createSubmission(
  submitterId,
  submitterTeamName,
  submissionSchema,
  metadata,
  peopleIds,
  peopleData,
  householdId,
  householdData
) {
  const people = [];
  for (const i of Object.keys(peopleIds)) {
    people.push({
      data: peopleData[i],
      ref: peopleIds[i],
    });
  }

  return new Submission({
    addedBy: submitterId,
    teamName: submitterTeamName,
    submissionSchema,
    metadata,
    people,
    household: {
      data: householdData,
      ref: householdId,
    },
  });
}

function createHousehold(followUpId, phone, email) {
  // TODO - handle different kinds of submsisions here
  return new Household({ followUpId, phone, email });
}

module.exports = {
  Submission,
  Household,
  Person,
  createSubmission,
  createHousehold,
  createPeople,
};
