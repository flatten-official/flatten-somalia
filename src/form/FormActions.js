export const Types = {
  SET_FOLLOW_UP_ID: "SET_FOLLOWUP_ID",
  SET_LOCATION: "SET_LOCATION",
  SET_FORMIO_CONTENT: "SET_FORMIO_CONTENT",
  RESTART_FORM: "START_NEW_FORM",
  NOTIFY_CONSENT_GIVEN: "NOTIFY_CONSENT_GIVEN",
  SET_START_TIME: "SET_START_TIME",
  NOTIFY_FOLLOW_UP_ID_RECORDED: "NOTIFY_FOLLOW_UP_ID_RECORDED",
};

export const setFollowUpId = (volunteerFriendlyId) => (dispatch) => {
  // TODO  generate follow up id
  const followUpId =
    volunteerFriendlyId.toString() + "-" + Date.now().toString();

  console.log(followUpId);

  dispatch({ type: Types.SET_FOLLOW_UP_ID, payload: followUpId });
};
