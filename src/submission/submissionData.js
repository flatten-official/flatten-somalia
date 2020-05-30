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
    people: [
      {
        // raw submission data (excluding people and death data)
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
      // raw submission data (excluding people and death data)
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
    // form schema version (the thing contained in the data object)
    submissionSchema: {
      // todo - maybe validate these using enums?
      form: { type: String, index: true, required: true }, // eg. 'somaliaInitialVolunteerSurvey'
      version: { type: String, index: true, required: true }, // eg. '1.0'
    },
    metadata: {
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
    headOfHouseholdName: String,
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
    name: String,
    gender: String,
    // todo - is there an easy way to query on the latest submission kind
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

async function createPeople(perPersonData) {
  let ret = await Person.insertMany(perPersonData);
  return ret.map((v) => v._id);
}

async function createSubmission(
  submitterId,
  submissionSchema,
  metadata,
  peopleIds,
  peopleData,
  householdId,
  householdData
) {
  let people = [];
  for (let [i, _] of Object.entries(peopleIds)) {
    people.push({
      data: peopleData[i],
      ref: peopleIds[i],
    });
  }

  let newSubmission = new Submission({
    addedBy: submitterId,
    submissionSchema,
    metadata,
    people,
    household: {
      data: householdData,
      ref: householdId,
    },
  });

  await newSubmission.save();

  return newSubmission._id;
}

async function createHousehold(publicId, phone, email, headOfHouseholdName) {
  const household = new Household({
    publicId,
    phone,
    email,
    headOfHouseholdName,
  });
  await household.save();
  return household._id;
}

async function setPersonToDead(personId) {
  await Person.findByIdAndUpdate(personId, {
    $push: {
      alive: false,
    },
  });
}

async function getVolunteerNextFollowUp(
  // todo - add option to select by district if needed
  // todo - add option to not select by volunteer
  volunteerId,
  district,
  minTimeSinceLastSubmission = 6 * 60 * 60 * 1000, // ms
  followUpTimeout = 24 * 60 * 60 * 1000 // ms
) {
  const next = await Submission.findOne(
    {
      $and: [
        {
          "metadata.uploadTimestamp": {
            $lt: Date.now() - minTimeSinceLastSubmission,
          },
        },
        { "followUp.id": { $exists: false } },
        {
          $or: [
            { "followUp.inProgress": { $eq: false } },
            {
              "followUp.startTime": {
                $lt: Date.now() - followUpTimeout,
              },
            },
          ],
        },
      ],
    },
    {},
    {
      // get earliest non-followed-up submission first
      sort: { uploadTimestamp: -1 },
    }
  );

  next.followUp = {
    inProgress: true,
    startTime: Date.now(),
  };

  await next.save();

  // get associated household/people so that we can display metadata
  let household = await Household.findById(next.household.ref);
  let people = await Person.find({
    _id: { $in: next.people.map((o) => o.ref) },
  });

  return [next._id, household, people];
}

// add submission that we followed up with
async function createFollowUpSubmisison(submissionId, ...newSubmissionData) {
  const newSubmissionId = await createSubmission(...newSubmissionData);

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
  createPeople,
  setPersonToDead,
  getVolunteerNextFollowUp,
  createFollowUpSubmisison,
  cancelVolunteerFollowUp,
};
