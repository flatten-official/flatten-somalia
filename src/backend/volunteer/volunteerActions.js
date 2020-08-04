import { listVolunteers, changeVolunteerAccess } from "./apiActions";
import { logout, UNAUTHENTICATED_CONTEXT } from "../auth/authActions";

export const FETCH_LIST_PENDING = "FETCH_LIST_PENDING";
export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILED = "FETCH_LIST_FAILED";
export const VOLUNTEER_CHANGE_SUCCESS = "VOLUNTEER_CHANGE_SUCCESS";
export const VOLUNTEER_CHANGE_PENDING = "VOLUNTEER_CHANGE_PENDING";
export const VOLUNTEER_CHANGE_FAILED = "VOLUNTEER_CHANGE_FAILED";

export const fetchVolunteerList = () => async (dispatch) => {
  try {
    const res = await listVolunteers();
    dispatch({ type: FETCH_LIST_SUCCESS, payload: res.data });
  } catch (e) {
    // If error is 401, session is invalid so logout user
    if (e.response && e.response.status === 401)
      dispatch(logout(false, UNAUTHENTICATED_CONTEXT.badCookie));
    else {
      console.error(e);
      dispatch({ type: FETCH_LIST_FAILED });
    }
  }
};

export const changeAccess = (volunteerId, newAccessStatus) => async (
  dispatch
) => {
  dispatch({ type: VOLUNTEER_CHANGE_PENDING, payload: { _id: volunteerId } });
  try {
    const res = await changeVolunteerAccess(newAccessStatus, volunteerId);

    dispatch({
      type: VOLUNTEER_CHANGE_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    // If error is 401, session is invalid so logout user
    if (e.response && e.response.status === 401)
      dispatch(logout(false, UNAUTHENTICATED_CONTEXT.badCookie));
    else {
      console.error(e);
      dispatch({
        type: VOLUNTEER_CHANGE_FAILED,
        payload: { _id: volunteerId },
      });
    }
  }
};
