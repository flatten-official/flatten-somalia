import React from "react";
import { useTranslation } from "react-i18next";
import { Spinner, Row, Container } from "react-bootstrap";
import PropTypes from "prop-types";

const Loading = ({ text }) => {
  const { t } = useTranslation("Loading");
  if (!text) text = t("loading");
  return (
    <Container>
      <Row>
        <Spinner className="spinner" variant="primary" animation="border" />
      </Row>
      <Row>
        <div className="spinnerText">{text}</div>
      </Row>
    </Container>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
