const { Error } = require("mongoose");

const { GravediggerSurvey, GravediggerDeathRecord } = require("./models");
const { definedKeys } = require("./utilities");

async function gravediggerSurveySubmission(
  volunteerId,
  volunteerTeamName,
  schema,
  metadata,
  surveyData
) {
  // create array of mongoose death records
  const recordedDeaths = surveyData.deaths.map((o) => {
    // set freeform entries as the first array element
    let comorbidities = [o.otherComorbidities];
    let symptomsBeforeDeath = [o.otherSymptoms];
    // form.io supplies an object full of booleans, so they are turned into string arrays
    comorbidities = comorbidities.concat(definedKeys(o.comorbidities));
    symptomsBeforeDeath = symptomsBeforeDeath.concat(
      definedKeys(o.symptomsBeforeDeath)
    );

    return new GravediggerDeathRecord({
      sex: o.sex,
      age: o.age,
      causeOfDeath: o.causeOfDeath,
      gravesite: surveyData.gravesite,
      dateOfDeath: o.dateOfDeath,
      comorbidities,
      symptomsBeforeDeath,
    });
  });

  // save death records, then save the submission record
  // nested callbacks since the second request depends on the first
  await GravediggerDeathRecord.insertMany(
    recordedDeaths,
    (err, deathRecords) => {
      const deathIDs = [];
      deathRecords.map((o) => {
        deathIDs.push(o._id);
      });

      // create survey record from submission data + death record IDs
      const gravediggerSurveryRecord = new GravediggerSurvey({
        addedBy: volunteerId,
        teamName: volunteerTeamName,
        submissionSchema: schema,
        metadata,
        surveyData: {
          gravediggerPhoneNumber: surveyData.gravediggerPhoneNumber,
          gravediggerEmail: surveyData.gravediggerEmail,
          gravesite: surveyData.gravesite,
          burialsThatDay: surveyData.burialsThatDay,
          deaths: deathIDs,
        },
      });

      // todo catch error + logging
      gravediggerSurveryRecord.save();
    }
  );
}

module.exports = {
  gravediggerSurveySubmission,
};
