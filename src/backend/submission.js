import backend from "./api/backend";
import flattenApi from "./api/api";

export const submitForm = async (storeData, formioData) => {
  const endTime = Date.now();
  const reformatted = {
    household: {
      followUpId: storeData.followUpId,
    },
    people: formioData.personGrid,
    deaths: formioData.deathGrid,
    metadata: {
      endTime: endTime,
      timeToComplete: endTime - storeData.startTime,
      location: storeData.location,
      consentGiven: storeData.consent,
    },
    schema: {
      form: "volunteerInitialForm",
      version: "0.1",
    },
  };

  Object.entries(formioData).forEach(([k, v]) => {
    if (!(k === "personGrid" || k === "deathGrid"))
      reformatted.household[k] = v;
  });

  // need to actually add the submission in here!
  await backend.request({
    ...flattenApi.volunteerForm,
    data: reformatted,
  });
};
