import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getLocation,
  LOCATION_FAIL,
  LOCATION_REQUEST,
} from "./locationActions";
import Loading from "../containers/Loading"

const Location = ({ getLocation, location }) => {
  useEffect(getLocation, [getLocation]);

  if (location.status === LOCATION_REQUEST) {
    return <Loading text="Waiting for location to load."></Loading>;
  } else if (location.status === LOCATION_FAIL) {
    return (
      <div>
        Location failed. Click the button to try again, or press the lock in the
        URL bar to grant location access if this doesn&apos;t work.
        <button onClick={getLocation} className="btn btn-primary">
          Try again.
        </button>
      </div>
    );
  }
  return <div>Got location. Waiting for load...</div>;
};

const mapStateToProps = (state) => {
  return {
    location: state.location,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getLocation: () => dispatch(getLocation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
