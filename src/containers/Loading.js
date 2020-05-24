import React from "react";
import { useTranslation } from "react-i18next";
import { Spinner, Row, Container, Col } from "react-bootstrap";

const Loading = ({text}) => {
  let { t } = useTranslation();
  // todo - is there a better way to assign a default prop with translation?
  let loadingText = text===undefined?t("Loading:loading"):text;
  return (
  <Container>
    <Row ><Spinner style={{margin: "auto", marginTop: 10 + "px", marginBottom: 10 + "px"}} variant="primary" animation="border"/></Row>
    <Row><div style={{margin: "auto"}}>{loadingText}</div></Row>
  </Container>
  );
};

export default Loading;
