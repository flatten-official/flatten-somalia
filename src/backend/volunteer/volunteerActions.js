import backend from "../api/backend";
import flattenApi from "../api/api";

export const FETCH_LIST_PENDING = "FETCH_LIST_PENDING";
export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILED = "FETCH_LIST_FAILED";
export const VOLUNTEER_ENABLED = "VOLUNTEER_ENABLED";
export const VOLUNTEER_DISABLED = "VOLUNTEER_DISABLED";
export const VOLUNTEER_CHANGE_PENDING = "VOLUNTEER_CHANGE_PENDING";
export const VOLUNTEER_CHANGE_FAILED = "VOLUNTEER_CHANGE_FAILED";

export const fetchVolunteerList = () => async (dispatch) => {
  try {
    const res = await backend.request(flattenApi.listVolunteers);
    if (res.status !== 200) {
      dispatch({ type: FETCH_LIST_FAILED });
    } else {
      dispatch({ type: FETCH_LIST_SUCCESS, payload: res.data });
    }
  } catch (e) {
    dispatch({ type: FETCH_LIST_FAILED });
  }
};

export const changeVolunteerAccess = (volunteerId, newAccessStatus) => async (
  dispatch
) => {
  try {
    const res = await backend.request({
      ...flattenApi.changeVolunteerAccess,
      data: { access: newAccessStatus, volunteerId },
    });
    console.log(res);
    if (res.status !== 200) {
      dispatch({ type: VOLUNTEER_CHANGE_FAILED });
    } else {
      dispatch({
        type: newAccessStatus ? VOLUNTEER_ENABLED : VOLUNTEER_DISABLED,
        payload: res.data,
      });
    }
  } catch (e) {
    dispatch({ type: VOLUNTEER_CHANGE_FAILED });
  }
};
