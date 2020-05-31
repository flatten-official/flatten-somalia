let submissionData = require("./submissionData");

async function initialSubmission(
  volunteerId,
  schema,
  metadata,
  people,
  deaths,
  household
) {
  let householdId = await submissionData.createHousehold(
    household.publicId,
    household.phone,
    household.email,
    household.headOfHouseName
  );

  let peopleModel = people.map((o) => {
    return {
      name: o.name,
      gender: o.gender,
      household: householdId,
      alive: false,
    };
  });
  let deathsModel = deaths.map((o) => {
    return {
      name: o.name,
      gender: o.gender,
      household: householdId,
      alive: false,
    };
  });

  let peopleIds = await submissionData.createPeople(
    [].concat(peopleModel, deathsModel)
  );

  await submissionData.createSubmission(
    volunteerId,
    schema,
    metadata,
    peopleIds,
    [].concat(people, deaths),
    householdId,
    household
  );
}

// TODO - decide what the props etc are for this
async function followUpSubmission(submissionData) {}

async function getFollowUpInfo(volunteerId, district) {
  let [
    submissionId,
    household,
    people,
  ] = submissionData.getVolunteerNextFollowUp(volunteerId, district);

  // TODO - return info as the client expects it
}

module.exports = {
  initialSubmission,
};
