import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Types } from "./FormActions";
import { Button, Col, Container, Row } from "react-bootstrap";
import React from "react";

export const Consent = () => {
  const { t } = useTranslation("VolunteerForm");
  const dispatch = useDispatch();

  const onConsent = () => {
    dispatch({ type: Types.SET_CONSENT, payload: true });
    dispatch({ type: Types.SET_START_TIME, payload: Date.now() });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="seventypxmargin"></div>
          <center>
            <div className="body">{t("consent")}</div>
          </center>
        </Col>
      </Row>
      <Row>
        <Col>
          <center>
            <div className="buttons">
              <Button onClick={onConsent}>
                {t("givesConsent")}
              </Button>
            </div>{" "}
          </center>
        </Col>
      </Row>
    </Container>
  );
};
