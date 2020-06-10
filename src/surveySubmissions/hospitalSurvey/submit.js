const mongoose = require("mongoose");

const {
  HospitalSurveySubmission,
} = require("../../models/hospitalSurveySubmission");

async function hospitalSurveySubmission(
  volunteerId,
  volunteerTeamName,
  submissionSchema,
  metadata,
  surveyData
) {
  const surveyDocument = new HospitalSurveySubmission({
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

  await surveyDocument.save();
}

module.exports = { hospitalSurveySubmission };
