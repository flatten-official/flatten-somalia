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
    submissionSchema: {
      // todo - maybe validate these using enums?
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
    // this is filled in when this submission has been followed up with
    // submission -> household
    followUp: {
      id: {
        type: mongoose.ObjectId,
        required: false,
        index: true,
      },
      inProgress: {
        type: Boolean,
        required: false,
        index: true,
      },
      followUpStartTime: {
        type: Date,
        index: true,
      },
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
          required: true,
        },
        submissionRef: {
          type: mongoose.ObjectId,
          ref: "Submission",
          index: true,
          required: true,
        },
      },
    ],
    // TODO - decide if we remove this - can we query the latest in the submissions
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
          required: true,
        },
        submissionKind: {
          type: String,
          enum: ["person", "death"],
          required: true,
        },
        submissionRef: {
          type: mongoose.ObjectId,
          ref: "Submission",
          index: true,
          required: true,
        },
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
      index: true,
    },
  })
);

// todo - is there a way to queue up the operations

async function createSubmission(
  submitterId,
  submissionSchema,
  location,
  filledOutTimestamp,
  timeToComplete,
  consentGiven,
  previousId = undefined // id of the previous submission for the same household
) {
  const newSubmission = new Submission({
    addedBy: submitterId,
    submissionSchema,
    location,
    filledOutTimestamp,
    timeToComplete,
    consentGiven,
  });

  await newSubmission.save();

  if (previousId !== undefined) {
    await Submission.findByIdAndUpdate(previousId, {
      followUp: { id: previousId, inProgress: false, followUpStartTime: null },
    });
  }

  return newSubmission._id;
}

// todo - maybe refactor so you can have a household in absence of submission data?

async function createHousehold(data, publicId, submissionId) {
  const household = new Household({
    submissions: [
      {
        data,
        submissionRef: submissionId,
      },
    ],
    publicId,
  });
  await household.save();
  return household._id;
}

async function createPerson(data, submissionKind, householdId, submissionId) {
  const person = new Person({
    submissions: [{ data, submissionKind, submissionRef: submissionId }],
    isAlive: submissionKind !== "death",
    householdId: householdId,
  });
  await person.save();
  return person._id;
}

async function addSubmissionToHousehold(householdId, data, submissionRef) {
  await Household.findByIdAndUpdate(householdId, {
    $push: {
      submissions: {
        data,
        submissionRef,
      },
    },
  });
}

async function addSubmissionToPerson(personId, data, submissionKind, submissionRef) {
  await Person.findByIdAndUpdate(personId, {
    $push: { submissions: { data, submissionRef } },
  });
}

module.exports = {
  Submission,
  Household,
  Person,
  createSubmission,
  createHousehold,
  createPerson,
  addSubmissionToHousehold,
  addSubmissionToPerson,
};
