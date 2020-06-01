import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { LocationObj } from "./LocationPicker";
import { Map, Marker, TileLayer } from "react-leaflet";

const INITIAL_ZOOM = 13;
const INITIAL_CENTER = [2.045, 45.333];

// TODO round returned values
/**
 * Component that allows the user to pick their location
 */
const ManualLocationPicker = ({ onSubmit, onCancel }) => {
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
      <h4>Pick your location</h4>
      <Map
        ref={mapRef}
        onMove={onMove}
        className="map"
        zoom={INITIAL_ZOOM}
        center={INITIAL_CENTER}
      >
        <TileLayer // TODO Pick better base layer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker // TODO Style Marker
          position={markerPosition}
        />
      </Map>
      <Button variant="light" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={submitHelper}>Submit</Button>
    </div>
  );
};

ManualLocationPicker.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Callback called when location is submitted
  onCancel: PropTypes.func.isRequired, // Callback called when operation is cancelled
};

export default ManualLocationPicker;
