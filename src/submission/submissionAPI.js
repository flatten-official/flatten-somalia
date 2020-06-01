const submissionData = require("./submissionData");
const { Error } = require("mongoose");

async function initialSubmission(
  volunteerId,
  schema,
  metadata,
  peopleData,
  deathsData,
  householdData
) {
  const household = await submissionData.createHousehold(
    householdData.publicId,
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
    schema,
    metadata,
    people.map((person) => person._id),
    [].concat(peopleData, deathsData),
    household._id,
    householdData
  );

  for (const person of people) {
    if (person.validateSync() !== undefined)
      throw new Error.ValidationError("");
  }
  if (household.validateSync() !== undefined)
    throw new Error.ValidationError("");
  if (submission.validateSync() !== undefined)
    throw new Error.ValidationError("");

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
