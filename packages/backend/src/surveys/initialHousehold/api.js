const Submission = require("./submissionData");
const Household = require("./householdData");
const Person = require("./peopleData");
const { ApiError } = require("../../utils/errors");
const { runOpWithinTransaction } = require("../../utils/mongoose");
const { log } = require("util-logging");

async function initialSubmission(
  volunteerId,
  volunteerTeamName,
  { metadata, people: peopleData, deaths: deathsData, household: householdData }
) {
  // required because (for example) we call householdData.followUpId which will crash if householdData is undefined
  if (!householdData) throw new ApiError("Household data not provided", 400);

  if (!peopleData) peopleData = [];
  if (!deathsData) deathsData = [];

  const household = await Household.create(
    householdData.followUpId,
    householdData.phone,
    householdData.email
  );

  const peopleModel = peopleData.map((person) => {
    return {
      name: person.name,
      gender: person.gender,
      household: household._id,
      alive: true,
    };
  });

  const deathsModel = deathsData.map((death) => {
    return {
      name: death.name,
      gender: death.gender,
      household: household._id,
      alive: false,
    };
  });

  const people = await Person.createManyAsync(
    [].concat(peopleModel, deathsModel)
  );

  const submission = await Submission.create(
    volunteerId,
    volunteerTeamName,
    metadata,
    people.map((person) => person._id),
    [].concat(peopleData, deathsData),
    household._id,
    householdData
  );

  await runOpWithinTransaction(async (session) => {
    for (const person of people) await person.save({ session });
    await household.save({ session });
    await submission.save({ session });
  });
}

/**
 * Wraps the api function to catch conflicting follow up id key errors and return a warning rather than an error.
 */
const errorHandler = (apiFunction) => async (...args) => {
  try {
    await apiFunction(...args);
  } catch (e) {
    if (
      e.message.includes(
        "E11000 duplicate key error collection: test.households index: followUpId_1 dup key:"
      )
    ) {
      log.warning(`Conflicting household follow up id keys.`, {
        error: e,
        status: 409,
      });
      throw new ApiError(
        "Failed. You are submitting forms too quickly or someone else is using your account. Please restart the survey.",
        409
      );
    } else throw e;
  }
};

module.exports = { initialSubmission: errorHandler(initialSubmission) };
