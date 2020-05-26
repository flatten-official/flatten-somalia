import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const LocationPicker = ({ submitCallback }) => {
  const onCancel = () => {
    //TODO determine location
    submitCallback({ lat: "43", lng: "43" });
  };

  const onSubmit = () => submitCallback(null);

  return (
    <div>
      <p>Location picker</p>
      <Button variant="light" onClick={onSubmit}>
        Cancel
      </Button>
      <Button onClick={onCancel}>Submit</Button>
    </div>
  );
};

LocationPicker.propTypes = {
  submitCallback: PropTypes.func.isRequired,
};

export default LocationPicker;
