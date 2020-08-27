const { Surveys } = require("../config");
const modelFactory = require("../defaultSurveyFactory/dataModelFactory");

module.exports = modelFactory(Surveys.research_1, {});
