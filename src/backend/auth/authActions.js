import backend from "../api/backend";
import flattenApi from "../api/api";

// actions
export const AUTH_SET_AUTHENTICATED = "AUTH_AUTHENTICATED";
export const AUTH_SET_UNAUTHENTICATED = "AUTH_UNAUTHENTICATED";
export const AUTH_DISCONNECT = "AUTH_DISCONNECT";

export const fetchAuthState = () => async (dispatch) => {
  try {
    const res = await backend.request(flattenApi.getAuth);
    // check if the response is empty, indicating failed auth
    // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    if (
      res.status !== 200 ||
      (Object.keys(res.data).length === 0 && res.data.constructor === Object)
    ) {
      dispatch({ type: AUTH_SET_UNAUTHENTICATED });
    } else {
      dispatch({ type: AUTH_SET_AUTHENTICATED, payload: res.data });
    }
  } catch (e) {
    dispatch({ type: AUTH_SET_UNAUTHENTICATED });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await backend.request(flattenApi.logout);
    dispatch({ type: AUTH_SET_UNAUTHENTICATED });
  } catch (e) {
    console.error(e);
  }
};
