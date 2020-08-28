import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import PropTypes from "prop-types";

export const BaseModal = ({ show = true, header, body, button, onClick }) => {
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
          {button || "OK"}
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

export const ExpireSoonModal = ({ minutes }) => {
  const { t } = useTranslation("Navbar");

  // TODO this may miss the expiry since willExpireSoon is only called on first render (afaik).
  const expiry = useSelector((state) => state.auth.user.expiry);
  const dispatch = useDispatch();

  const willExpireSoon = new Date(expiry) - minutes * 60 * 1000 <= Date.now();

  return (
    <BaseModal
      show={willExpireSoon}
      header={t("expire.header")}
      body={t("expire.body")}
      onClick={() => dispatch(logout())}
    />
  );
};

ExpireSoonModal.propTypes = {
  minutes: PropTypes.number,
};
