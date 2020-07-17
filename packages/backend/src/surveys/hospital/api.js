const HospitalSurveySubmission = require("./submissionData");

async function submitHospitalSurvey(
  volunteerId,
  volunteerTeamName,
  submissionSchema,
  metadata,
  surveyData
) {
  const document = await HospitalSurveySubmission.create({
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

  await HospitalSurveySubmission.saveAsync(document);
}

module.exports = { submitHospitalSurvey };
