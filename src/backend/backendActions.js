export const submitSuccess = (name, payload) => async (dispatch) => {
  const actionType = `SUBMIT_SUCCESS_${name}`;
  dispatch({ type: actionType, payload });
};

export const submitFailure = (name, payload) => async (dispatch) => {
  const actionType = `SUBMIT_FAIL_${name}`;
  dispatch({ type: actionType, payload });
};
