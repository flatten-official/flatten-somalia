const mongoose = require("db-utils");
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
  for (const id of Object.keys(peopleIds)) {
    people.push({
      data: peopleData[id],
      ref: peopleIds[id],
    });
  }

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

module.exports = {
  model,
  create,
};
