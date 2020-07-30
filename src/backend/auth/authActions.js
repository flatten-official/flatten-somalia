import backend from "../api/backend";
import flattenApi from "../api/api";

// states
export const AUTH_UNINITIALISED = "AUTH_UNINITIALISED";
export const AUTH_AUTHENTICATED = "AUTH_AUTHENTICATED";
export const AUTH_UNAUTHENTICATED = "AUTH_UNAUTHENTICATED";

// actions
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED";

/**
 * Different contexts (or reasons) why we might be unauthenticated
 */
export const UNAUTHENTICATED_CONTEXT = {
  failedRequest: "FAILED_REQUEST",
  badCookie: "BAD_COOKIE",
  expireSoon: "EXPIRE_SOON",
  userDecision: "USER_DECISION",
  pageLoad: "PAGE_LOAD",
};

/**
 * Check if the cookie will expire in less than "minutes". In which case will log us out
 */
export const checkSessionExpiry = (minutes) => (dispatch, getState) => {
  const expiry = getState().auth.user.expiry;

  const willExpireSoon = new Date(expiry) - minutes * 60 * 1000 <= Date.now();

  if (willExpireSoon)
    dispatch(logout(true, UNAUTHENTICATED_CONTEXT.expireSoon));
};

// https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
const isEmptyObject = (o) =>
  Object.keys(o.data).length === 0 && o.data.constructor === Object;

/**
 * Will fetch the user's current authentication state and update the redux store
 * @param contextIfUnauthenticated if the result is unauthenticated, what is the context (reason)?
 * @param logoutIfFails if the request fails should the user be logged out or do we do nothing
 */
export const fetchAuthState = (
  contextIfUnauthenticated,
  logoutIfFails
) => async (dispatch) => {
  try {
    const res = await backend.request(flattenApi.getAuth);

    // check if the response is empty, indicating failed auth
    // TODO make backend return 401 instead of empty object for failed auth
    if (isEmptyObject(res)) dispatch(logout(false, contextIfUnauthenticated));
    else dispatch({ type: SET_AUTHENTICATED, payload: res.data });
  } catch (e) {
    console.error(e);
    if (logoutIfFails)
      dispatch(logout(false, UNAUTHENTICATED_CONTEXT.failedRequest));
  }
};

/**
 * Logs the user out
 * @param sendApiRequest whether we should send a logout request to the backend or just make the change on the frontend
 * @param context the context (or reason) for why we'll be logged out
 */
export const logout = (sendApiRequest, context) => async (dispatch) => {
  if (sendApiRequest) {
    try {
      await backend.request(flattenApi.logout);
    } catch (e) {
      console.error(e);
    }
  }

  dispatch({ type: SET_UNAUTHENTICATED, payload: context });
};
