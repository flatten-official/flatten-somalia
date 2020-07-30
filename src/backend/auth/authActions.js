import backend from "../api/backend";
import flattenApi from "../api/api";

// states
export const AUTH_UNINITIALISED = "AUTH_UNINITIALISED";
export const AUTH_AUTHENTICATED = "AUTH_AUTHENTICATED";
export const AUTH_UNAUTHENTICATED = "AUTH_UNAUTHENTICATED";

// actions
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED";

export const UNAUTHENTICATED_REASONS = {
  failedRequest: "FAILED_REQUEST",
  badCookie: "BAD_COOKIE",
};

export const fetchAuthState = (reasonIfUnauthenticated) => async (dispatch) => {
  try {
    const res = await backend.request(flattenApi.getAuth);
    // check if the response is empty, indicating failed auth
    // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    if (
      res.status !== 200 ||
      (Object.keys(res.data).length === 0 && res.data.constructor === Object)
    ) {
      dispatch({ type: SET_UNAUTHENTICATED, payload: reasonIfUnauthenticated });
    } else {
      dispatch({ type: SET_AUTHENTICATED, payload: res.data });
    }
  } catch (e) {
    dispatch({
      type: SET_UNAUTHENTICATED,
      payload: UNAUTHENTICATED_REASONS.failedRequest,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await backend.request(flattenApi.logout);
    dispatch({ type: SET_UNAUTHENTICATED });
  } catch (e) {
    console.error(e);
  }
};
