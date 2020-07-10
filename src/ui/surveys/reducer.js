/**
 * This reduce is somewhat special. It manages multiple surveys at once where each form is
 * in a sub-"directory". The main reducer directs actions to the proper sub-directory
 * while the subReducer modifies the sub-directory (that survey's state).
 */

import Types from "./actionTypes";

// Simply and array of all the possible action types for easy filtering in the reducer
const TYPES_ARRAY = Object.values(Types);

/**
 * The reducer function calls this subReducer to actual modify the current form's state
 */
const subReducer = (state, action) => {
  switch (action.type) {
    case Types.RESTART_SURVEY:
      return { started: false, consent: false, completed: false };
    case Types.SET_FOLLOW_UP_ID:
      return { ...state, followUpId: action.payload };
    case Types.SET_LOCATION:
      return { ...state, location: action.payload };
    case Types.SET_FORMIO_CONTENT:
      return { ...state, formIO: action.payload };
    case Types.SET_LOCATION_TIME:
      return { ...state, locationTime: action.payload };
    case Types.SET_START_TIME:
      return { ...state, startTime: action.payload };
    case Types.NOTIFY_STARTED:
      return { ...state, started: true };
    case Types.SET_CONSENT_TIME:
      return { ...state, consentTime: action.payload };
    case Types.NOTIFY_CONSENT_GIVEN:
      return { ...state, consent: true };
    case Types.NOTIFY_COMPLETED_SURVEY:
      return { ...state, completed: true };
    default:
      return state;
  }
};

const reducer = (state = {}, action) => {
  // If the action is not one of the form actions
  if (!TYPES_ARRAY.includes(action.type)) return state;

  // If action is restart, set the form to the initial setting
  const activeSurvey =
    action.type === Types.RESTART_SURVEY ? action.payload : state.activeSurvey;

  return {
    ...state,
    [activeSurvey]: subReducer(state[activeSurvey], action),
    activeSurvey,
  };
};

export default reducer;
