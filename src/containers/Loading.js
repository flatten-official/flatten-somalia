import React from "react";
import { useTranslation } from "react-i18next";
import { Spinner, Row, Container } from "react-bootstrap";
import PropTypes from "prop-types";

const Loading = ({ text }) => {
  const { t } = useTranslation();
  // todo - is there a better way to assign a default prop with translation?
  const loadingText = text === undefined ? t("Loading:loading") : text;
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
        <div style={{ margin: "auto" }}>{loadingText}</div>
      </Row>
    </Container>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
