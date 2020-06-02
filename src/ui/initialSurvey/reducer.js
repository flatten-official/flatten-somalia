import { Types } from "./actions";

export const reducer = (state = {}, action) => {
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
    case Types.RESTART_FORM:
      return { consent: false, isFollowUpIdRecorded: false };
    default:
      return state;
  }
};
