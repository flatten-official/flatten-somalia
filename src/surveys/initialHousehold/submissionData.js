const mongoose = require("mongoose");
const { createModel } = require("../../utils/mongoose");
const { getSubmissionMetadata, FormSchema } = require("../sharedDataSchemas");

// DO NOT MODIFY SCHEMA/MODEL UNLESS YOU KNOW WHAT YOU'RE DOING
const model = createModel("Submission", {
  // volunteer who made the submission
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
  submissionSchema: FormSchema,
  metadata: getSubmissionMetadata(true, false, false),
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
});

async function create(
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

  // Add each person to the array
  Object.keys(peopleIds).forEach((id) => {
    people.push({
      data: peopleData[id],
      ref: peopleIds[id],
    });
  });

  const submission = new model({
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

  await submission.validate();

  return submission;
}

// async function getVolunteerNextFollowUp(
//   // todo - add option to select by district if needed
//   // todo - add option to not select by volunteer
//   volunteerId,
//   district,
//   minTimeSinceLastSubmission = 6 * 60 * 60 * 1000, // ms
//   followUpTimeout = 24 * 60 * 60 * 1000 // ms
// ) {
//   const next = await model.findOne(
//     {
//       $and: [
//         {
//           "metadata.uploadTimestamp": {
//             $lt: Date.now() - minTimeSinceLastSubmission,
//           },
//         },
//         { "followUp.id": { $exists: false } },
//         {
//           $or: [
//             { "followUp.inProgress": { $eq: false } },
//             {
//               "followUp.startTime": {
//                 $lt: Date.now() - followUpTimeout,
//               },
//             },
//           ],
//         },
//       ],
//     },
//     {},
//     {
//       // get earliest non-followed-up submissionInitial first
//       sort: { uploadTimestamp: -1 },
//     }
//   );
//
//   next.followUp = {
//     inProgress: true,
//     startTime: Date.now(),
//   };
//
//   await next.save();
//
//   // get associated household/people so that we can display metadata
//   const household = await Household.findById(next.household.ref);
//   const people = await Person.find({
//     _id: { $in: next.people.map((o) => o.ref) },
//   });
//
//   return [next._id, household, people];
// }
//
// // add submissionInitial that we followed up with
// async function createFollowUpSubmisison(submissionId, ...newSubmissionData) {
//   const newSubmission = await createSubmission(...newSubmissionData);
//
//   await model.findByIdAndUpdate(submissionId, {
//     followUp: { id: newSubmission._id, inProgress: false },
//   });
//
//   return newSubmission;
// }
//
// async function cancelVolunteerFollowUp(submissionId) {
//   await model.findByIdAndUpdate(submissionId, {
//     followUp: { inProgress: false },
//   });
// }

module.exports = {
  model,
  create,
};
