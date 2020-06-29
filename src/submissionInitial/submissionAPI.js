const submissionData = require("./submissionData");
const { log } = require("../utils/winston");

const { Error } = require("mongoose");

async function initialSubmission(
  volunteerId,
  volunteerTeamName,
  schema,
  metadata,
  peopleData,
  deathsData,
  householdData
) {
  const household = await submissionData.createHousehold(
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

  const people = await submissionData.createPeople(
    [].concat(peopleModel, deathsModel)
  );

  const submission = await submissionData.createSubmission(
    volunteerId,
    volunteerTeamName,
    schema,
    metadata,
    people.map((person) => person._id),
    [].concat(peopleData, deathsData),
    household._id,
    householdData
  );

  for (const person of people) {
    const validation = person.validateSync();
    if (validation !== undefined) {
      log.error("Problem validating a Person. ", { error: validation });
      throw new Error.ValidationError("");
    }
  }
  const householdValidation = household.validateSync();
  if (householdValidation !== undefined) {
    log.error("Problem validating a Household. ", {
      error: householdValidation,
    });
    throw new Error.ValidationError("");
  }
  const submissionValidation = submission.validateSync();
  if (submissionValidation !== undefined) {
    log.error("Problem validating a Submission. ", {
      error: submissionValidation,
    });
    throw new Error.ValidationError("");
  }

  for (const person of people) await person.save();
  await household.save();
  await submission.save();
}

module.exports = {
  initialSubmission,
};
