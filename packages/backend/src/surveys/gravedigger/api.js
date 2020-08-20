const GravediggerSurveySubmission = require("./submissionData");

async function submitGravediggerSurvey(
  volunteerId,
  volunteerTeamName,
  { schema, metadata, data }
) {
  const submissionDocument = await GravediggerSurveySubmission.create({
    metadata: {
      addedBy: volunteerId,
      teamName: volunteerTeamName,
      ...metadata,
    },
    surveyData: {
      submissionSchema: schema,
      gravesite: data.gravesite,
      gravediggerPhoneNumber: data.gravediggerPhoneNumber,
      burialsThatDay: data.burialsThatDay,
    },
  });

  await GravediggerSurveySubmission.saveAsync(submissionDocument);
}

module.exports = { submitGravediggerSurvey };
