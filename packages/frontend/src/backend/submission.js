import backend from "./api/backend";
import flattenApi from "./api/api";

const getMetadata = (storeData, pageNames) => {
  const endTime = Date.now();
  const metadata = {
    endTime: endTime,
    timeToComplete: endTime - storeData.startTime,
    location: storeData.location,
    consentGiven: storeData.consent,
    pageTimings: {
      location: storeData.locationTime,
      start: storeData.startTime,
      consent: storeData.consentTime,
    },
  };

  if (pageNames) {
    for (const [pageNum, timing] of Object.entries(storeData.pageTimings)) {
      metadata.pageTimings[pageNames[pageNum - 1]] = timing;
    }
  }

  return metadata;
};

const preFormatFormio = (formioData) => {
  Object.keys(formioData).forEach((key) => {
    if (key.startsWith("exclude-")) delete formioData[key];
  });
};

export const defaultSurveySubmitterFactory = (api, schema) => async (
  storeData,
  formioData
) => {
  preFormatFormio(formioData);

  const body = {
    metadata: getMetadata(storeData),
    schema,
    data: formioData,
  };

  await backend.request({ ...api, data: body });
};

export const getInitialHouseholdSubmitter = (schema, pageNames) => async (
  storeData,
  formioData
) => {
  preFormatFormio(formioData);

  const body = {
    household: {
      followUpId: storeData.followUpId,
    },
    people: formioData.personGrid,
    deaths: formioData.deathGrid,
    metadata: getMetadata(storeData, pageNames),
    schema,
  };

  Object.entries(formioData).forEach(([k, v]) => {
    if (!(k === "personGrid" || k === "deathGrid")) body.household[k] = v;
  });

  // need to actually add the submission in here!
  await backend.request({ ...flattenApi.volunteerForm, data: body });
};

// todo refactor into one factory with followupID option?
export const InitialBRASurveySubmitterFactory = (api, schema) => async (
  storeData,
  formioData
) => {
  preFormatFormio(formioData);

  const body = {
    metadata: getMetadata(storeData),
    schema,
    data: {
      followUpId: storeData.followUpId,
      ...formioData,
    },
  };

  await backend.request({ ...api, data: body });
};
