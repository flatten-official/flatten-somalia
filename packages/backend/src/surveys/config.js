const { Surveys: SharedSurveys } = require("util-shared-constants");

const Surveys = {
  initialHousehold: {
    ...SharedSurveys.initialHousehold,
    noTeamNameAndAddedByInMetadata: true, // This property is due to an old definition of the metadata schema
  },
  gravedigger: {
    ...SharedSurveys.gravedigger,
  },
  hospital: {
    ...SharedSurveys.hospital,
  },
};

module.exports = { Surveys };
