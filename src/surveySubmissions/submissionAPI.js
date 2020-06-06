const { gravediggerSurvey, gravediggerDeathRecord } = require("./models");

const { Error } = require("mongoose");

async function gravediggerSurveySubmission(
  volunteerId,
  volunteerTeamName,
  schema,
  metadata,
  surveyData
) {
  // create array of mongoose death records
  const recordedDeaths = surveyData.deaths.map((o) => {
    return new gravediggerDeathRecord({
      sex: o.deceasedSex,
      age: o.deceasedAge,
      causeOfDeath: o.causeOfDeath,
      dateOfDeath: o.deathDate,
      comorbidities: o.deceasedComorbidities,
      symptoms: o.deceasedSymptoms,
    });
  });

  const deathIDs = [];

  // write each death to the DB
  for (const death of recordedDeaths) {
    // todo catch error + logging
    await death.save((err, deathRecord) => {
      // keep track of death records created
      deathIDs.push(deathRecord._id);
    });
  }

  // create survey record from submission data + death record IDs
  const gravediggerSurveryRecord = new gravediggerSurvey({
    addedBy: volunteerId,
    teamName: volunteerTeamName,
    schema,
    metadata,
    surveyData: {
      gravediggerPhoneNumber: surveyData.gravediggerPhoneNumber,
      gravediggerEmail: surveyData.gravediggerEmail,
      gravesite: surveyData.gravesite,
      burialsThatDay: surveyData.burialsThatDay,
      deaths: deathIDs,
    },
  });

  // todo catch error + logging
  await gravediggerSurveryRecord.save();
}

module.exports = {
  gravediggerSurveySubmission,
};
