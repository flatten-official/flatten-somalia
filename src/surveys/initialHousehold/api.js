const Submission = require("./submissionData");
const Household = require("./householdData");
const Person = require("./peopleData");
const { BadInputError } = require("../../utils/errors");

async function initialSubmission(
  volunteerId,
  volunteerTeamName,
  schema,
  metadata,
  peopleData,
  deathsData,
  householdData
) {
  // required because we call householdData.followUpId and otherwise we will crash
  if (!householdData) throw new BadInputError("Household data not provided");

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

  const people = await Person.createMany([].concat(peopleModel, deathsModel));

  const submission = await Submission.create(
    volunteerId,
    volunteerTeamName,
    schema,
    metadata,
    people.map((person) => person._id),
    [].concat(peopleData, deathsData),
    household._id,
    householdData
  );

  for (const person of people) await person.save();
  await household.save();
  await submission.save();
}

module.exports = { initialSubmission };
