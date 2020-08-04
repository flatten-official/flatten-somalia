import endpoints from "./api/endpoints";

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

export const defaultSurveySubmitterFactory = (endpoint, schema) => async (
  storeData,
  formioData
) => {
  preFormatFormio(formioData);

  const body = {
    metadata: getMetadata(storeData),
    schema,
    data: formioData,
  };

  await endpoint(body);
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

  await endpoints.submitVolunteerForm(body);
};
