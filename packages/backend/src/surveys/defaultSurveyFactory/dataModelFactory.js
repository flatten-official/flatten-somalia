const { getSubmissionMetadata } = require("../sharedDataSchemas");
const Util = require("../../utils/mongoose");

module.exports = (survey, dataSchema) =>
  Util.createModel(survey.collectionName, {
    metadata: getSubmissionMetadata(survey),
    surveyData: dataSchema,
  });
