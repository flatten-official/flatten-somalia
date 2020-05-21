import React, { useEffect } from "react";
import { connect } from "react-redux";
import {getLocation, LOCATION_SUCCESS, LOCATION_FAIL, LOCATION_REQUEST, LOCATION_UNITITIALISED} from "./locationActions";

const Location = ({getLocation, location}) => {

  useEffect(getLocation, []);

  if (location.status===LOCATION_REQUEST) {
    return <div>Waiting for location to load.</div>;
  } else if (location.status === LOCATION_FAIL) {
    return (
    <div>
      Location failed. Click the button to try again, or press the lock in the URL bar to grant location access if this doesn't work.
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