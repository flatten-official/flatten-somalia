import React, { useEffect } from "react";
import {
  getLocation,
  LOCATION_FAIL,
  LOCATION_REQUEST,
} from "./locationActions";
import { useDispatch, useSelector } from "react-redux";

const Location = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  useEffect(dispatch(getLocation()), []);

  if (location.status === LOCATION_REQUEST) {
    return <div>Waiting for location to load.</div>;
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

export default Location;
