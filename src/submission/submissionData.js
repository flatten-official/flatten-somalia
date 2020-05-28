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
        index: true,
      },
      inProgress: {
        type: Boolean,
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
  consentGiven
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

  return newSubmission._id;
}

// todo - find if there is an easy way to get the final property that exists in a list of objects

async function createHousehold(publicId, data, submissionId) {
  const submissions = [];
  if (data !== undefined) {
    submissions.push({
      data,
      submissionRef: submissionId,
    });
  }
  // todo add phone numbers to outer of object
  const household = new Household({
    submissions,
    publicId,
  });
  await household.save();
  return household._id;
}

async function createPerson(householdId, submissionId, data, submissionKind) {
  const submissions = [];
  if (submissionId !== undefined) {
    submissions.push({
      data,
      submissionKind,
      submissionRef: submissionId,
    });
  }
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

async function addSubmissionToPerson(
  personId,
  data,
  submissionKind,
  submissionRef
) {
  // todo - update isAlive flag
  await Person.findByIdAndUpdate(personId, {
    $push: { submissions: { data, submissionRef } },
  });
}

async function getVolunteerNextFollowUp(
  // todo - add option to select by district if needed
  // todo - add option to not select by volunteer
  volunteerId,
  minTimeSinceLastSubmission,
  followUpTimeout = 24 * 60 * 60 * 1000 // ms
) {
  let next = await Submission.findOne(
    {
      $and: [
        { uploadTimestamp: { $gt: Date.now() - minTimeSinceLastSubmission } },
        { "followUp.id": { $exists: false } },
        {
          $or: [
            { "followUp.inProgress": { $eq: false } },
            {
              "followUp.followUpStartTime": {
                $lt: Date.now() - followUpTimeout,
              },
            },
          ],
        },
      ],
    },
    {
      // get earliest non-followed-up submission first
      sort: { uploadTimestamp: -1 },
    }
  );

  next.followUp = {
    inProgress: true,
    followUpStartTime: Date.now(),
  };

  await next.save();

  // TODO - return next follow up metadata instead of just id
  return next._id;
}

// add submission that we followed up with
async function createFollowUpSubmisison(submissionId, ...newSubmissionData) {
  let newSubmissionId = await createSubmission(...newSubmissionData);

  await Submission.findByIdAndUpdate(submissionId, {
    followUp: { id: newSubmissionId, inProgress: false },
  });
}

async function cancelVolunteerFollowUp(submissionId) {
  await Submission.findByIdAndUpdate(submissionId, {
    followUp: { inProgress: false },
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
  getVolunteerNextFollowUp,
  createFollowUpSubmisison,
  cancelVolunteerFollowUp,
};
