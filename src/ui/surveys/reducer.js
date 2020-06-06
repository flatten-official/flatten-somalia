import Types from "./actionTypes";

const initialState = {
  graveDigger: {},
  hospital: {},
};

const subReducer = (state = {}, action) => {
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
    case Types.NOTIFY_FOLLOW_UP_ID_RECORDED:
      return { ...state, isFollowUpIdRecorded: true };
    default:
      console.log(`Does not support action ${action.type}`);
      return state;
  }
};

const reducer = (state = initialState, action) => {
  if (action.type === Types.RESTART_SURVEY) {
    return {
      ...state,
      [action.surveyKey]: { consent: false, isFollowUpIdRecorded: false },
      activeSurvey: action.payload,
    };
  } else if (action.type in Types) {
    return {
      ...state,
      [state.activeSurvey]: subReducer(state[state.activeSurvey], action),
    };
  } else return state;
};

export default reducer;
