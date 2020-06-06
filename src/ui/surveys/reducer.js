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
      console.log(`Does not support action ${action.type}`);
      return state;
  }
};

const reducer = (state = {}, action) => {
  if (action.type === Types.RESTART_SURVEY) {
    return {
      ...state,
      [action.payload]: INITIAL_SURVEY_STATE,
      activeSurvey: action.payload,
    };
  } else if (TYPES_ARRAY.includes(action.type)) {
    return {
      ...state,
      [state.activeSurvey]: subReducer(state[state.activeSurvey], action),
    };
  } else return state;
};

export default reducer;
