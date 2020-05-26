export const LOCATION_REQUEST = "LOCATION_REQUEST";
export const LOCATION_SUCCESS = "LOCATION_SUCCESS";
export const LOCATION_FAIL = "LOCATION_FAIL";
export const LOCATION_UNINITIALISED = "LOCATION_UNINITIALISED";

export const getBrowserLocation = () => (dispatch) => {
  const geolocation = navigator.geolocation;

  dispatch({ type: LOCATION_REQUEST });

  geolocation.getCurrentPosition(
    (position) => dispatch(setLocation(position)),
    () => dispatch({ type: LOCATION_FAIL, payload: true })
  );
};

export const setLocation = (position) => (dispatch) => {
  dispatch({
    type: LOCATION_SUCCESS,
    payload: position,
  });
};
