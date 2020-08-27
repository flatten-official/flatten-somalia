const { Surveys } = require("../config");
const modelFactory = require("../defaultSurveyFactory/dataModelFactory");

module.exports = modelFactory(Surveys.gravedigger, {
  gravesite: {
    type: String,
    required: true,
    index: true,
  },
  gravediggerPhoneNumber: {
    type: String,
    required: true,
  },
  burialsThatDay: {
    type: Number,
    required: true,
  },
});
