const mongoose = require("mongoose");

const HospitalSurveySubmission = require("../../models/hospitalSurveySubmission");

async function hospitalSurveySubmission(
  volunteerId,
  volunteerTeamName,
  submissionSchema,
  metadata,
  surveyData
) {
  const document = new HospitalSurveySubmission.model({
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

module.exports = { hospitalSurveySubmission };