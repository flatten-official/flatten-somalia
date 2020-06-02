const submissionData = require("./submissionData");

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
  if (volunteerTeamName === undefined) {
    console.log(
      `Warning: ${volunteerId} has no team name. Assigning default ${submissionData.NO_TEAM_NAME}`
    );
    volunteerTeamName = submissionData.NO_TEAM_NAME;
  }

  const household = await submissionData.createHousehold(
    householdData.followUpId,
    householdData.phone,
    householdData.email,
    householdData.headOfHouseName
  );

  const peopleModel = peopleData.map((o) => {
    return {
      name: o.name,
      gender: o.gender,
      household: household._id,
      alive: false,
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
      console.error(validation);
      throw new Error.ValidationError("");
    }
  }
  const householdValidation = household.validateSync();
  if (householdValidation !== undefined) {
    console.error(householdValidation);
    throw new Error.ValidationError("");
  }
  const submissionValidation = submission.validateSync();
  if (submissionValidation !== undefined) {
    console.log(submissionValidation);
    throw new Error.ValidationError("");
  }

  for (const person of people) await person.save();
  await household.save();
  await submission.save();
}

// TODO - decide what the props etc are for this
async function followUpSubmission(submissionData) {}

async function getFollowUpInfo(volunteerId, district) {
  const [
    submissionId,
    household,
    people,
  ] = submissionData.getVolunteerNextFollowUp(volunteerId, district);

  // TODO - return info as the client expects it
}

module.exports = {
  initialSubmission,
};
