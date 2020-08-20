const HospitalSurveySubmission = require("./submissionData");

async function submitHospitalSurvey(
  volunteerId,
  volunteerTeamName,
  { schema, metadata, data }
) {
  const document = await HospitalSurveySubmission.create({
    metadata: {
      addedBy: volunteerId,
      teamName: volunteerTeamName,
      ...metadata,
    },
    surveyData: {
      submissionSchema: schema,
      ...data,
    },
  });

  await HospitalSurveySubmission.saveAsync(document);
}

module.exports = { submitHospitalSurvey };
