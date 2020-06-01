import { Types } from "../form/FormActions";

export const volunteerFormReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.SET_FOLLOW_UP_ID:
      return { ...state, followUpId: action.payload };
    case Types.SET_LOCATION:
      return { ...state, location: action.payload };
    case Types.SET_FORMIO_CONTENT:
      return { ...state, formIO: action.payload };
    case Types.SET_START_TIME:
      return { ...state, startTime: action.payload };
    case Types.SET_CONSENT:
      return { ...state, consent: action.payload };
    case Types.RESTART_FORM:
      return { consent: false };
    default:
      return state;
  }
};
