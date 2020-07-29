import backend from "./api/backend";
import flattenApi from "./api/api";
import { SET_UNAUTHENTICATED } from "./auth/authActions";
import Types from "../ui/surveys/actionTypes";

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

export const getInitialHouseholdSubmitter = (schema, pageNames) => async (
  storeData,
  formioData,
  dispatch
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
  await submitSurvey(flattenApi.volunteerForm, body, dispatch);
};

export const defaultSurveySubmitterFactory = (api, schema) => async (
  storeData,
  formioData,
  dispatch
) => {
  preFormatFormio(formioData);

  const body = {
    metadata: getMetadata(storeData),
    schema,
    data: formioData,
  };

  await submitSurvey(api, body, dispatch);
};

const submitSurvey = async (api, body, dispatch) => {
  try {
    await backend.request({ ...api, data: body });
  } catch (e) {
    if (e.response && e.response.status === 401)
      dispatch({ type: SET_UNAUTHENTICATED, wasDisconnected: true });

    throw e;
  }

  dispatch({ type: Types.NOTIFY_COMPLETED_SURVEY });
};
