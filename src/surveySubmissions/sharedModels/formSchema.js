const FormSchema = {
  form: { type: String, index: true, required: true }, // eg. 'somaliaInitialVolunteerSurvey'
  version: { type: String, index: true, required: true }, // eg. '1.0.0'
};

module.exports = { FormSchema };
