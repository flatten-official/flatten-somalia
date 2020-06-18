const Submission = require("./submissionData");
const Household = require("./householdData");
const Person = require("./peopleData");

async function initialSubmission(
  volunteerId,
  volunteerTeamName,
  schema,
  metadata,
  peopleData,
  deathsData,
  householdData
) {
  const household = await Household.create(
    householdData.followUpId,
    householdData.phone,
    householdData.email
  );

  const peopleModel = peopleData.map((o) => {
    return {
      name: o.name,
      gender: o.gender,
      household: household._id,
      alive: true,
    };
  });

  const deathsModel = deathsData.map((o) => {
    return {
      name: o.name,
      gender: o.gender,
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
