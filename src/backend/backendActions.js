import backend from "./backend";

// Redux actions for the backend.

export const submitSuccess = (name, payload) => async(dispatch) => {
  let actionType = `SUBMIT_SUCCESS_${name}`;
  dispatch({type: actionType, payload});
}

export const submitFailure = (name, payload) => async(dispatch) => {
  let actionType = `SUBMIT_FAIL_${name}`;
  dispatch({type: actionType, payload});
}