import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import PropTypes from "prop-types";

const BaseModal = ({ show = true, header, body, button = "OK", onClick }) => {
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
            if (onClick) onClick();
          }}
        >
          {button}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

BaseModal.propTypes = {
  show: PropTypes.bool,
  header: PropTypes.string,
  body: PropTypes.string,
  button: PropTypes.string,
  onClick: PropTypes.func,
};

export default BaseModal;
