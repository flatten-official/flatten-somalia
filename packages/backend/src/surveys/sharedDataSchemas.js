const { mongoose } = require("util-db");

const FormSchema = {
  form: { type: String, index: true, required: true }, // eg. 'somaliaInitialVolunteerSurvey'
  version: { type: String, index: true, required: true }, // eg. '1.0.0'
};

const DEFAULT_PAGE_NAMES = ["start", "consent", "location"];

const getPageTimingsSchema = (customPageNames = []) => {
  const schema = {};
  for (const name of DEFAULT_PAGE_NAMES.concat(customPageNames))
    schema[name] = Number;
  return schema;
};

const getSubmissionMetadata = (
  survey,
  includeTeamName = true,
  includeAddedBy = true
) => {
  const metadata = {
    location: {
      type: {
        lat: Number,
        lng: Number,
        accuracy: Number,
        altitude: Number,
        wasManual: Boolean,
      },
      required: survey.enableManualLocation, // if manual location is enabled then they must select a location
    },
    // recorded on the user's browser with JS Date.now()
    endTime: { type: Number, index: true },
    timeToComplete: Number, // ms
    uploadTimestamp: {
      type: Date,
      index: true,
      required: true,
      default: Date.now,
    },
    consentGiven: { type: String, required: true },
    pageTimings: getPageTimingsSchema(survey.customPageNames),
  };

  if (includeAddedBy)
    metadata.addedBy = {
      type: mongoose.ObjectId,
      required: true,
      index: true,
    };

  if (includeTeamName)
    metadata.teamName = {
      type: String,
      required: true,
      index: true,
    };

  return metadata;
};

module.exports = { FormSchema, getSubmissionMetadata };
