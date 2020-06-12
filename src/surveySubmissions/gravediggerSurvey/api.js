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
  const deaths = await Promise.all(
    surveyData.deaths.map((deceased) => {
      return DeathRecord.create({
        submissionSchema: schema,
        gravesite: surveyData.gravesite,
        ...deceased,
      });
    })
  );

  const deathIDs = deaths.map((death) => death._id);

  const submissionDocument = await GravediggerSurveySubmission.create({
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

  await DeathRecord.insertMany(deaths);
  await GravediggerSurveySubmission.save(submissionDocument);
}

module.exports = { submitGravediggerSurvey };
