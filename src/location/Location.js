import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrowserLocation as getLocationAction,
  setLocation,
  LOCATION_FAIL,
  LOCATION_REQUEST,
  LOCATION_SUCCESS,
  LOCATION_UNINITIALISED,
} from "./locationActions";
import Loading from "../containers/Loading";
import { Button } from "react-bootstrap";
import LocationPicker from "./LocationPicker";

const Location = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const getLocation = () => dispatch(getLocationAction());
  useEffect(getLocation, []);

  const [isManual, setIsManual] = useState(false);

  const onManualSubmit = (location) => {
    if (location) dispatch(setLocation(location));

    setIsManual(false);
  };

  switch (location.status) {
    case LOCATION_UNINITIALISED:
    case LOCATION_REQUEST:
      return <Loading text="Waiting for location to load." />;
    case LOCATION_FAIL:
      if (isManual) {
        return <LocationPicker submitCallback={onManualSubmit} />;
      } else {
        return (
          <>
            <h3>We need your location.</h3>
            <Button onClick={getLocation}>Try again.</Button>
            {/*TODO this button seems to do nothing which is confusing*/}
            <Button onClick={() => setIsManual(true)}>
              Manually pick location.
            </Button>
          </>
        );
      }
    case LOCATION_SUCCESS:
      return <div>Got location. Waiting for load...</div>;
  }
};

export default Location;
