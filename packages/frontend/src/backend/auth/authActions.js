import backend from "../api/backend";
import flattenApi from "../api/api";

<<<<<<< HEAD:packages/frontend/src/backend/auth/authActions.js
// states
export const AUTH_UNINITIALISED = "AUTH_UNINITIALISED";
export const AUTH_AUTHENTICATED = "AUTH_AUTHENTICATED";
export const AUTH_UNAUTHENTICATED = "AUTH_UNAUTHENTICATED";
=======
// actions
export const AUTH_SET_AUTHENTICATED = "AUTH_AUTHENTICATED";
export const AUTH_SET_UNAUTHENTICATED = "AUTH_UNAUTHENTICATED";
export const AUTH_DISCONNECT = "AUTH_DISCONNECT";
>>>>>>> 8097dac... Simplify auth and add modal code:src/backend/auth/authActions.js

// actions
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED";

export const fetchAuthState = () => async (dispatch) => {
  try {
    const res = await backend.request(flattenApi.getAuth);
    // check if the response is empty, indicating failed auth
    // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    if (
      res.status !== 200 ||
      (Object.keys(res.data).length === 0 && res.data.constructor === Object)
    ) {
<<<<<<< HEAD:packages/frontend/src/backend/auth/authActions.js
      dispatch({ type: SET_UNAUTHENTICATED });
    } else {
      dispatch({ type: SET_AUTHENTICATED, payload: res.data });
    }
  } catch (e) {
    dispatch({ type: SET_UNAUTHENTICATED });
=======
      dispatch({ type: AUTH_SET_UNAUTHENTICATED });
    } else {
      dispatch({ type: AUTH_SET_AUTHENTICATED, payload: res.data });
    }
  } catch (e) {
    dispatch({ type: AUTH_SET_UNAUTHENTICATED });
>>>>>>> 8097dac... Simplify auth and add modal code:src/backend/auth/authActions.js
  }
};

export const logout = () => async (dispatch) => {
  try {
    await backend.request(flattenApi.logout);
<<<<<<< HEAD:packages/frontend/src/backend/auth/authActions.js
    dispatch({ type: SET_UNAUTHENTICATED });
=======
    dispatch({ type: AUTH_SET_UNAUTHENTICATED });
>>>>>>> 8097dac... Simplify auth and add modal code:src/backend/auth/authActions.js
  } catch (e) {
    console.error(e);
  }
};
