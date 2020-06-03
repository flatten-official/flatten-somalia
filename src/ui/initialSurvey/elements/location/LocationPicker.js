import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ManualLocationPicker from "./ManualLocationPicker";
import Loading from "../../../components/Loading";
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

  const { t } = useTranslation("InitialSurvey");
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

    setTimeout(() => setStatus(LOCATION_FAILED), 30000); // after a while set to failed as a worst case
  };

  useEffect(getBrowserLocation, []); // Call the function on start

  // Called when the manual location picker submits
  const onUseManual = () => setStatus(LOCATION_MANUAL);

  // eslint-disable-next-line default-case
  switch (status) {
    case LOCATION_REQUESTED:
      return <Loading text={t("location.loading")} />;
    case LOCATION_FAILED:
      return (
        <>
          <h4>{t("location.isRequiredPrompt")}</h4>
          <br />
          {/*TODO this button seems to do nothing which is confusing*/}
          <Button variant="light" size="lg" onClick={getBrowserLocation}>
            {t("location.rePrompt")}
          </Button>
          <Button variant="light" size="lg" onClick={onUseManual}>
            {t("location.pickManuallyPrompt")}
          </Button>
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
