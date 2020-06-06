export const Types = {
  SET_FOLLOW_UP_ID: "SET_FOLLOWUP_ID",
  SET_LOCATION: "SET_LOCATION",
  SET_FORMIO_CONTENT: "SET_FORMIO_CONTENT",
  RESTART_FORM: "START_NEW_FORM",
  NOTIFY_CONSENT_GIVEN: "NOTIFY_CONSENT_GIVEN",
  SET_START_TIME: "SET_START_TIME",
  NOTIFY_FOLLOW_UP_ID_RECORDED: "NOTIFY_FOLLOW_UP_ID_RECORDED",
};

// DO NOT MODIFY, WILL BREAK FOLLOW SYSTEM
const INITIAL_START_DATE = new Date(1590981168000); // Represents a fixed moment in time serving as a reference

export const setFollowUpId = (volunteerFriendlyId) => (dispatch) => {
  const timeDifference = Date.now() - INITIAL_START_DATE;
  const timeDifferenceInMin = Math.round(timeDifference / (1000 * 60));
  const followUpId = volunteerFriendlyId + "-" + timeDifferenceInMin;

  dispatch({ type: Types.SET_FOLLOW_UP_ID, payload: followUpId });
};
