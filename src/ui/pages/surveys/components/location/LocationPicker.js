import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import Loading from "../../../../commonComponents/app/Loading";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import ManualLocationPicker from "./ManualLocationPicker";

export const LocationObj = (lat, lng, accuracy, altitude, wasManual) => ({
  lat: lat,
  lng: lng,
  accuracy: accuracy,
  altitude: altitude,
  wasManual: wasManual,
});
export const LocationPicker = ({ onLocationFound, enableManual }) => {
  const STATUS = {
    requested: "LOCATION_REQUESTED",
    failed: "LOCATION_FAILED_AUTO",
    manual: "LOCATION_MANUAL",
  };

  const { t } = useTranslation("Surveys");

  const [currentStatus, setStatus] = useState(STATUS.requested);

  /**
   * Gets the location from the browser (in LOCATION_REQUESTED state while fetching)
   */
  const getBrowserLocation = () => {
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
      () => setStatus(STATUS.failed),
      { timeout: 30000, maximumAge: 180000 }
    );
  };

  // TODO Cleanup to avoid memory leaks
  useEffect(getBrowserLocation, [STATUS.failed, onLocationFound]); // Call the function on start

  // eslint-disable-next-line default-case
  switch (currentStatus) {
    case STATUS.requested:
      return <Loading />;
    case STATUS.failed:
      if (!enableManual) {
        onLocationFound(null);
        return null;
      }

      return (
        <>
          <h4>{t("location.isRequiredPrompt")}</h4>
          <br />
          {/*TODO this button seems to do nothing which is confusing*/}
          <Button variant="light" size="lg" onClick={getBrowserLocation}>
            {t("location.rePrompt")}
          </Button>
          <Button
            variant="light"
            size="lg"
            onClick={() => setStatus(STATUS.manual)}
          >
            {t("location.pickManuallyPrompt")}
          </Button>
        </>
      );

    case STATUS.manual:
      return (
        <ManualLocationPicker
          onSubmit={onLocationFound}
          onCancel={() => setStatus(STATUS.failed)}
        />
      );
  }
};

LocationPicker.propTypes = {
  onLocationFound: PropTypes.func,
  enableManual: PropTypes.bool,
};
