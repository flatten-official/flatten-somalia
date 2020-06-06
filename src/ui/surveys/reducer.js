/**
 * This reduce is somewhat special. It manages multiple surveys at once where each form is
 * in a sub-"directory". The main reducer directs actions to the proper sub-directory
 * while the subReducer modifies the sub-directory (that survey's state).
 */

import Types from "./actionTypes";

const INITIAL_SURVEY_STATE = { consent: false };
const TYPES_ARRAY = Object.values(Types);

const subReducer = (state = INITIAL_SURVEY_STATE, action) => {
  switch (action.type) {
    case Types.SET_FOLLOW_UP_ID:
      return { ...state, followUpId: action.payload };
    case Types.SET_LOCATION:
      return { ...state, location: action.payload };
    case Types.SET_FORMIO_CONTENT:
      return { ...state, formIO: action.payload };
    case Types.SET_START_TIME:
      return { ...state, startTime: action.payload };
    case Types.NOTIFY_CONSENT_GIVEN:
      return { ...state, consent: true };
    default:
      return state;
  }
};

const reducer = (state = {}, action) => {
  // If action is restart, set the form to the initial setting
  if (action.type === Types.RESTART_SURVEY) {
    return {
      ...state,
      [action.payload]: INITIAL_SURVEY_STATE,
      activeSurvey: action.payload,
    };
  }
  // If the action is one of the form actions
  else if (TYPES_ARRAY.includes(action.type)) {
    return {
      ...state,
      [state.activeSurvey]: subReducer(state[state.activeSurvey], action),
    };
  } else return state;
};

export default reducer;
