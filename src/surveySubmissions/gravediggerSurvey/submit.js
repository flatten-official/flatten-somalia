const mongoose = require("mongoose");

const DeathRecord = require("../../models/deathRecord");
const GravediggerSurveySubmission = require("../../models/gravediggerSurveySubmission");

async function submitGravediggerSurvey(
  volunteerId,
  volunteerTeamName,
  schema,
  metadata,
  surveyData
) {
  // create array of mongoose death records
  const recordedDeaths = surveyData.deaths.map((o) => {
    return new DeathRecord.model({
      submissionSchema: schema,
      gravesite: surveyData.gravesite,
      age: o.age,
      sex: o.sex,
      comorbidities: o.comorbidities,
      // otherComorbidities,
      symptomsBeforeDeath: o.symptomsBeforeDeath,
      // otherSymptoms
      causeOfDeath: o.causeOfDeath,
      dateOfDeath: o.dateOfDeath,
    });
  });

  console.log(recordedDeaths);

  // save death records, then save the submissionInitial record
  // nested callbacks since the second request depends on the first
  await DeathRecord.model.insertMany(recordedDeaths, (err, deathRecords) => {
    console.log(err);
    const deathIDs = [];
    deathRecords.map((o) => {
      deathIDs.push(o._id);
    });

    // create survey record from submissionInitial models + death record IDs
    const document = new GravediggerSurveySubmission.model({
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

    GravediggerSurveySubmission.save(document);
  });
}

module.exports = { submitGravediggerSurvey };
