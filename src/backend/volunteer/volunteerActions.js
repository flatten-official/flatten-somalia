import backend from "../api/backend";
import flattenApi from "../api/api";

export const FETCH_LIST_PENDING = "FETCH_LIST_PENDING";
export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILED = "FETCH_LIST_FAILED";
export const FETCH_LIST_PERMISSION_DENIED = "FETCH_LIST_PERMISSION_DENIED";
export const VOLUNTEER_ENABLED = "VOLUNTEER_ENABLED";
export const VOLUNTEER_DISABLED = "VOLUNTEER_DISABLED";
export const VOLUNTEER_CHANGE_PENDING = "VOLUNTEER_CHANGE_PENDING";
export const VOLUNTEER_CHANGE_FAILED = "VOLUNTEER_CHANGE_FAILED";

export const fetchVolunteerList = () => async (dispatch) => {
  const parseStatus = (status) =>
    status === 403 ? FETCH_LIST_PERMISSION_DENIED : FETCH_LIST_FAILED;

  try {
    const res = await backend.request(flattenApi.listVolunteers);
    if (res.status !== 200) {
      dispatch({
        type: parseStatus(res.status),
      });
    } else {
      dispatch({ type: FETCH_LIST_SUCCESS, payload: res.data });
    }
  } catch (e) {
    dispatch({ type: parseStatus(e.response.status) });
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
