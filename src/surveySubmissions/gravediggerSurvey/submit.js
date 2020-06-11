const DeathRecord = require("./deathRecord");
const GravediggerSurveySubmission = require("./gravediggerSurveySubmission");

async function submitGravediggerSurvey(
  volunteerId,
  volunteerTeamName,
  schema,
  metadata,
  surveyData
) {
  // create array of mongoose death records
  const deaths = surveyData.deaths.map((deceased) => {
    return new DeathRecord.model({
      submissionSchema: schema,
      gravesite: surveyData.gravesite,
      age: deceased.age,
      sex: deceased.sex,
      wasPregnant: deceased.wasPregnant,
      comorbidities: deceased.comorbidities,
      otherComorbidities: deceased.otherComorbidities,
      symptomsBeforeDeath: deceased.symptomsBeforeDeath,
      otherSymptomsBeforeDeath: deceased.otherSymptomsBeforeDeath,
      causeOfDeath: deceased.causeOfDeath,
      dateOfDeath: deceased.dateOfDeath,
    });
  });

  const deathIDs = deaths.map((death) => death._id);

  // create survey record from submissionInitial models + death record IDs
  const submissionDocument = new GravediggerSurveySubmission.model({
    metadata: {
      addedBy: volunteerId,
      teamName: volunteerTeamName,
      ...metadata,
    },
    surveyData: {
      submissionSchema: schema,
      gravesite: surveyData.gravesite,
      gravediggerPhoneNumber: surveyData.gravediggerPhoneNumber,
      gravediggerEmail: surveyData.gravediggerEmail,
      burialsThatDay: surveyData.burialsThatDay,
      deaths: deathIDs,
    },
  });

  for (const death of deaths) {
    await death.validate();
  }
  await submissionDocument.validate();

  await DeathRecord.insertMany(deaths);
  await GravediggerSurveySubmission.save(submissionDocument);
}

module.exports = { submitGravediggerSurvey };
