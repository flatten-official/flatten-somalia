import React, { useEffect } from "react";
import { connect } from "react-redux";

const LOCATION_REQUEST = 'LOCATION_REQUEST';
const LOCATION_SUCCESS = 'LOCATION_SUCCESS';
const LOCATION_FAIL = 'LOCATION_FAIL';
const LOCATION_UNITITIALISED = 'LOCATION_UNITIALISED';

function getLocation() {
    return dispatch => {
        const geolocation = navigator.geolocation;
        dispatch({type:LOCATION_REQUEST});
        geolocation.getCurrentPosition((position) => {
            dispatch({
                type: LOCATION_SUCCESS,
                payload: position
            });
        }, (error) => {
            dispatch({
                type: LOCATION_FAIL,
                payload: true
            })
        });
    };
}

const Location = ({getLocation, location}) => {

  useEffect(getLocation, []);

  if (location.status===LOCATION_REQUEST) {
    return <div>Waiting for geo.</div>;
  } else if (location.status === LOCATION_FAIL) {
    return (
    <div>
      Location request failed.
      <button onClick={getLocation} class="btn btn-primary">
        Try again.
      </button>

    </div>)
  }
  return <div>Got location. Waiting for load...</div>

}

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.location,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  getLocation: () => dispatch(getLocation())
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
export {getLocation, LOCATION_REQUEST, LOCATION_SUCCESS, LOCATION_FAIL, LOCATION_UNITITIALISED};