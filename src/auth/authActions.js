import backend from "../backend/backend";
import flattenApi from "../backend/api";

// actions
export const AUTH_INITIALISING = "AUTH_INITIALISING";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const fetchAuthState = () => async (dispatch) => {
  dispatch({ type: AUTH_INITIALISING });

  try {
    let res = await backend.request(flattenApi.getAuth);
    // check if the response is empty, indicating failed auth
    if (Object.keys(res.data).length === 0 && res.data.constructor === Object) {
      dispatch({ type: AUTH_FAIL });
    } else {
      dispatch({ type: AUTH_SUCCESS, payload: res.data });
    }
  } catch (e) {
    dispatch({ type: AUTH_FAIL });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await backend.request(flattenApi.logout);
    dispatch({ type: AUTH_LOGOUT });
  } catch (e) {
    // todo - what do we do for a failed logout???
  }
};
// end actions
