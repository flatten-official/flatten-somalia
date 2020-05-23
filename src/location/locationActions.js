export const LOCATION_REQUEST = "LOCATION_REQUEST";
export const LOCATION_SUCCESS = "LOCATION_SUCCESS";
export const LOCATION_FAIL = "LOCATION_FAIL";
export const LOCATION_UNINITIALISED = "LOCATION_UNINITIALISED";

export function getLocation() {
  return (dispatch) => {
    const geolocation = navigator.geolocation;
    dispatch({ type: LOCATION_REQUEST });
    geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: LOCATION_SUCCESS,
          payload: position,
        });
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        dispatch({
          type: LOCATION_FAIL,
          payload: true,
        });
      }
    );
  };
}
