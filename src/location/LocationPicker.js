import React, { Component, createRef } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { LocationObj } from "./Location";
import { Map, Marker, TileLayer } from "react-leaflet";

const initialZoom = 13;
const initialPosition = [2.045, 45.333];

// TODO round values returned
class LocationPicker extends Component {
  state = { markerPosition: initialPosition };

  mapRef = createRef();

  getCenter = () => this.mapRef.current.leafletElement.getCenter();

  submitHelper = () => {
    const center = this.getCenter();
    this.props.onSubmit(LocationObj(center.lat, center.lng, null, null, true));
  };

  onMove = () => {
    const center = this.getCenter();
    this.setState({ markerPosition: [center.lat, center.lng] });
  };

  render() {
    return (
      <div>
        <h4>Pick your location</h4>
        <Map
          ref={this.mapRef}
          onMove={this.onMove}
          className="map"
          zoom={initialZoom}
          center={initialPosition}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={this.state.markerPosition} />
        </Map>
        <Button variant="light" onClick={this.props.onCancel}>
          Cancel
        </Button>
        <Button onClick={this.submitHelper}>Submit</Button>
      </div>
    );
  }
}

LocationPicker.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LocationPicker;
