import backend from "./api/backend";
import flattenApi from "./api/api";

const getMetadata = (storeData) => {
  const endTime = Date.now();
  return {
    endTime: endTime,
    timeToComplete: endTime - storeData.startTime,
    location: storeData.location,
    consentGiven: storeData.consent,
  };
};

export const defaultSurveySubmitterFactory = (api, schema) => async (
  storeData,
  formioData
) => {
  const body = {
    metadata: getMetadata(storeData),
    schema,
    data: formioData,
  };

  await backend.request({ ...api, data: body });
};

export const getInitialHouseholdSubmitter = (schema) => async (
  storeData,
  formioData
) => {
  const body = {
    household: {
      followUpId: storeData.followUpId,
    },
    people: formioData.personGrid,
    deaths: formioData.deathGrid,
    metadata: getMetadata(storeData),
    schema,
  };

  Object.entries(formioData).forEach(([k, v]) => {
    if (!(k === "personGrid" || k === "deathGrid")) body.household[k] = v;
  });

  // need to actually add the submission in here!
  await backend.request({
    ...flattenApi.volunteerForm,
    data: body,
  });
};
