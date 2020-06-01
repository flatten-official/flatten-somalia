import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { Button } from "react-bootstrap";
import ManualLocationPicker from "./ManualLocationPicker";
import { useDispatch } from "react-redux";
import { Types } from "../../actions";

export const LocationObj = (lat, lng, accuracy, altitude, wasManual) => ({
  lat: lat,
  lng: lng,
  accuracy: accuracy,
  altitude: altitude,
  wasManual: wasManual,
});

export const LocationPicker = () => {
  const LOCATION_REQUESTED = "LOCATION_REQUESTED";
  const LOCATION_FAILED = "LOCATION_FAILED_AUTO";
  const LOCATION_MANUAL = "LOCATION_MANUAL";

  const dispatch = useDispatch();

  const [status, setStatus] = useState(LOCATION_REQUESTED);

  const onLocationFound = (location) =>
    dispatch({ type: Types.SET_LOCATION, payload: location });

  /**
   * Gets the location from the browser (in LOCATION_REQUESTED state while fetching)
   */
  const getBrowserLocation = () => {
    setStatus(LOCATION_REQUESTED);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationFound(
          LocationObj(
            position.coords.latitude,
            position.coords.longitude,
            position.coords.accuracy,
            position.coords.altitude,
            false
          )
        );
      },
      () => setStatus(LOCATION_FAILED)
    );
  };

  useEffect(getBrowserLocation, []); // Call the function on start

  // Called when the manual location picker submits
  const onUseManual = () => setStatus(LOCATION_MANUAL);

  // eslint-disable-next-line default-case
  switch (status) {
    case LOCATION_REQUESTED:
      return <Loading text="Waiting for location to load." />;
    case LOCATION_FAILED:
      return (
        <>
          <h3>We need your location.</h3>
          {/*TODO this button seems to do nothing which is confusing*/}
          <Button onClick={getBrowserLocation}>Try again.</Button>
          <Button onClick={onUseManual}>Manually pick location.</Button>
        </>
      );
    case LOCATION_MANUAL:
      return (
        <ManualLocationPicker
          onSubmit={onLocationFound}
          onCancel={() => setStatus(LOCATION_FAILED)}
        />
      );
  }
};
