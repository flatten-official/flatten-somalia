const mongoose = require("mongoose");

const { HospitalSurvey } = require("../../models/hospitalSurveySubmission");

async function hospitalSurveySubmission(
  volunteerId,
  volunteerTeamName,
  schema,
  metadata,
  surveyData
) {
  const surveyDocument = new HospitalSurvey({
    addedBy: volunteerId,
    teamName: volunteerTeamName,
    submissionSchema: schema,
    metadata,
    surveyData,
  });

  await surveyDocument.save();
}

module.exports = { hospitalSurveySubmission };
