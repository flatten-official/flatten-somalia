import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { LocationObj } from "./Location";

const LocationPicker = ({ onSubmit, onCancel }) => {
  const submitHelper = () => {
    //TODO determine location
    onSubmit(LocationObj("45", "46", 200, 200, true));
  };

  return (
    <div>
      <h4>Pick your location</h4>
      <Button variant="light" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={submitHelper}>Submit</Button>
    </div>
  );
};

LocationPicker.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LocationPicker;
