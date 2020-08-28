import {
  AUTH_UNINITIALISED,
  AUTH_AUTHENTICATED,
  AUTH_UNAUTHENTICATED,
} from "./authActions";

const authReducer = (state = { status: AUTH_UNINITIALISED }, action) => {
  switch (action.type) {
    case AUTH_AUTHENTICATED:
      return { ...state, status: AUTH_AUTHENTICATED, user: action.payload };
    case AUTH_UNAUTHENTICATED:
      return { ...state, status: AUTH_UNAUTHENTICATED, user: undefined };
    default:
      return state;
  }
};

export default authReducer;
