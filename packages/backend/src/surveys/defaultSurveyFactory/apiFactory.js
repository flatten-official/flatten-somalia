/**
 * Function that returns an API function. API functions will take all the values from the request and make a submission
 */
module.exports = (dataModel) => async (
  volunteerId,
  volunteerTeamName,
  requestBody
) => {
  // Read the default body
  const { schema, metadata, data } = requestBody;

  // Create a standard document from the provided model
  const submissionDocument = new dataModel({
    metadata: {
      addedBy: volunteerId,
      teamName: volunteerTeamName,
      submissionSchema: schema,
      ...metadata,
    },
    surveyData: data,
  });

  await submissionDocument.validate();
  await submissionDocument.save();
};
