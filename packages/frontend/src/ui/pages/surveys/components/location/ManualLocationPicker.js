import { useTranslation } from "react-i18next";
import React, { useRef, useState } from "react";
import { LocationObj } from "./LocationPicker";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const INITIAL_ZOOM = 13;
const INITIAL_CENTER = [2.045, 45.333];
// TODO round returned values
/**
 * Component that allows the user to pick their location
 */
const ManualLocationPicker = ({ onSubmit, onCancel }) => {
  const { t } = useTranslation("Surveys");

  const [markerPosition, setMarkerPosition] = useState(INITIAL_CENTER);

  const mapRef = useRef(); // Reference to the map object

  const getCenter = () => mapRef.current.leafletElement.getCenter();

  // Called when submit button is pressed
  const submitHelper = () => {
    const center = getCenter();
    onSubmit(LocationObj(center.lat, center.lng, null, null, true));
  };

  // Called while the map moves
  const onMove = () => {
    const center = getCenter();
    setMarkerPosition([center.lat, center.lng]);
  };

  return (
    <div>
      <h4>{t("location.pickLocationPrompt")}</h4>
      <Map
        ref={mapRef}
        onMove={onMove}
        className="map"
        zoom={INITIAL_ZOOM}
        center={INITIAL_CENTER}
      >
        <TileLayer
          url="https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker // TODO Style Marker
          position={markerPosition}
        />
      </Map>
      <div className="locationPickerButtons">
        <Button
          variant="light"
          onClick={onCancel}
          className="locationPickerCancel"
        >
          {t("translation:cancel")}
        </Button>
        <Button onClick={submitHelper}>{t("translation:submit")}</Button>
      </div>
    </div>
  );
};

ManualLocationPicker.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Callback called when location is submitted
  onCancel: PropTypes.func.isRequired, // Callback called when operation is cancelled
};
export default ManualLocationPicker;
