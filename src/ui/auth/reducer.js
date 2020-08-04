import {
  AUTH_UNINITIALISED,
  AUTH_AUTHENTICATED,
  AUTH_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from "./actions";

const authReducer = (state = { state: AUTH_UNINITIALISED }, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, state: AUTH_AUTHENTICATED, user: action.payload };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        state: AUTH_UNAUTHENTICATED,
        user: undefined,
        unauthenticatedContext: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
