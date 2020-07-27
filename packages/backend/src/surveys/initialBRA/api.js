const initialBRASurveySubmission = require("./submissionData");

async function submitInitialBRASurvey(
  volunteerId,
  volunteerTeamName,
  submissionSchema,
  metadata,
  surveyData
) {
  const document = await initialBRASurveySubmission.create({
    metadata: {
      addedBy: volunteerId,
      teamName: volunteerTeamName,
      ...metadata,
    },
    surveyData: {
      submissionSchema,
      ...surveyData,
    },
  });

  await initialBRASurveySubmission.saveAsync(document);
}

module.exports = { submitInitialBRASurvey };
