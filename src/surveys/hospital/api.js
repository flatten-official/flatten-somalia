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

  await HospitalSurveySubmission.save(document);
}

module.exports = { submitHospitalSurvey };
