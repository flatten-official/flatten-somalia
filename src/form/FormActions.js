export const Types = {
  SET_FOLLOW_UP_ID: "SET_FOLLOWUP_ID",
  SET_LOCATION: "SET_LOCATION",
  SET_FORMIO_CONTENT: "SET_FORMIO_CONTENT",
  RESTART_FORM: "START_NEW_FORM",
  SET_CONSENT: "SET_CONSENT",
  SET_START_TIME: "SET_START_TIME",
};

export const setFollowUpId = () => (dispatch) => {
  // TODO  generate follow up id
  const followUpId = "some-id";

  dispatch({ type: Types.SET_FOLLOW_UP_ID, payload: followUpId });
};
