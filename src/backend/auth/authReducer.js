import {
  AUTH_UNINITIALISED,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from "./authActions";

const authReducer = (state = { status: AUTH_UNINITIALISED }, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, status: AUTH_SUCCESS, user: action.payload };
    case AUTH_LOGOUT:
      return { ...state, status: AUTH_LOGOUT, user: undefined };
    case AUTH_FAIL:
      return { ...state, status: AUTH_FAIL, user: undefined };
    default:
      return state;
  }
};

export default authReducer;
