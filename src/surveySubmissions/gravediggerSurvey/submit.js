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
  const recordedDeaths = surveyData.deaths.map((o) => {
    return new DeathRecord.model({
      submissionSchema: schema,
      gravesite: surveyData.gravesite,
      age: o.age,
      sex: o.sex,
      comorbidities: o.comorbidities,
      // otherComorbidities,
      symptomsBeforeDeath: o.symptomsBeforeDeath,
      // otherSymptoms
      causeOfDeath: o.causeOfDeath,
      dateOfDeath: o.dateOfDeath,
    });
  });

  const deathIDs = recordedDeaths.map((o) => o._id);

  // create survey record from submissionInitial models + death record IDs
  const document = new GravediggerSurveySubmission.model({
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

  await DeathRecord.insertMany(recordedDeaths);
  await GravediggerSurveySubmission.save(document);
}

module.exports = { submitGravediggerSurvey };
