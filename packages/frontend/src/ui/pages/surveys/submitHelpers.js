const getMetadata = (version, storeData, pageNames) => {
  const endTime = Date.now();
  const metadata = {
    version,
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

export const preFormatFormio = (formioData) => {
  Object.keys(formioData).forEach((key) => {
    if (key.startsWith("exclude-")) delete formioData[key];
  });
};

export const defaultSubmitBodyFormatter = (
  version,
  storeData,
  formioData,
  pageNames
) => ({
  metadata: getMetadata(version, storeData, pageNames),
  data: formioData,
});

export const initialHouseholdSubmitBodyFormatter = (
  version,
  storeData,
  formioData,
  pageNames
) => {
  const body = {
    household: {
      followUpId: storeData.followUpId,
    },
    people: formioData.personGrid,
    deaths: formioData.deathGrid,
    metadata: getMetadata(version, storeData, pageNames),
  };

  Object.entries(formioData).forEach(([k, v]) => {
    if (!(k === "personGrid" || k === "deathGrid")) body.household[k] = v;
  });

  return body;
};
