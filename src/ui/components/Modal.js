import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import PropTypes from "prop-types";

const MyModal = ({ show, header, body, button, onClick }) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <Modal show={show && !accepted} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            setAccepted(true);
            onClick();
          }}
        >
          {button || "OK"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

MyModal.propTypes = {
  show: PropTypes.bool,
  header: PropTypes.string,
  body: PropTypes.string,
  button: PropTypes.string,
  onClick: PropTypes.string,
};

export default MyModal;
