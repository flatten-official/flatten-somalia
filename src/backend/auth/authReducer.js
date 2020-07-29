import {
  AUTH_DISCONNECT,
  AUTH_SET_AUTHENTICATED,
  AUTH_SET_UNAUTHENTICATED,
} from "./authActions";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_SET_AUTHENTICATED:
      return { ...state, user: action.payload };
    case AUTH_SET_UNAUTHENTICATED:
      return { ...state, user: null, wasDisconnected: false };
    case AUTH_DISCONNECT:
      return { ...state, user: null, wasDisconnected: true };
    default:
      return state;
  }
};

export default authReducer;
