const GravediggerSurveySubmission = require("./submissionData");

async function submitGravediggerSurvey(
  volunteerId,
  volunteerTeamName,
  schema,
  metadata,
  surveyData
) {
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
    },
  });

  await GravediggerSurveySubmission.save(submissionDocument);
}

module.exports = { submitGravediggerSurvey };
