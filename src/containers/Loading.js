import React from "react";
import { useTranslation } from "react-i18next";
import { Spinner, Row, Container } from "react-bootstrap";
import PropTypes from "prop-types";

const Loading = ({ text }) => {
  const { t } = useTranslation();
  if (!text) text = t("Loading:loading");
  return (
    <Container>
      <Row>
        <Spinner
          style={{
            margin: "auto",
            marginTop: 10 + "px",
            marginBottom: 10 + "px",
          }}
          variant="primary"
          animation="border"
        />
      </Row>
      <Row>
        <div style={{ margin: "auto" }}>{text}</div>
      </Row>
    </Container>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
