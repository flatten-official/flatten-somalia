const DeathRecord = require("../../models/deathRecord");
const GravediggerSurveySubmission = require("../../models/gravediggerSurveySubmission");

async function submitGravediggerSurvey(
  volunteerId,
  volunteerTeamName,
  schema,
  metadata,
  surveyData
) {
  // create array of mongoose death records
  const deaths = surveyData.deaths.map((o) => {
    return new DeathRecord.model({
      submissionSchema: schema,
      gravesite: surveyData.gravesite,
      age: o.age,
      sex: o.sex,
      comorbidities: o.comorbidities,
      otherComorbidities: o.otherComorbidities,
      symptomsBeforeDeath: o.symptomsBeforeDeath,
      otherSymptomsBeforeDeath: o.otherSymptomsBeforeDeath,
      causeOfDeath: o.causeOfDeath,
      dateOfDeath: o.dateOfDeath,
    });
  });

  const deathIDs = deaths.map((o) => o._id);

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
