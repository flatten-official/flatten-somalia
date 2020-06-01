import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setFollowUpId, Types } from "./FormActions";
import { Button, Col, Container, Row } from "react-bootstrap";
import React from "react";

export const Consent = () => {
  const { t } = useTranslation("InitialSurvey");
  const dispatch = useDispatch();

  const volunteerFriendlyId = useSelector(
    (state) => state.auth.user.friendlyId
  );

  const onConsent = () => {
    dispatch({ type: Types.NOTIFY_CONSENT_GIVEN });
    dispatch({ type: Types.SET_START_TIME, payload: Date.now() });
    dispatch(setFollowUpId(volunteerFriendlyId));
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="seventypxmargin"></div>
          <center>
            <div className="body">{t("askForDataRecordingConsent")}</div>
          </center>
        </Col>
      </Row>
      <Row>
        <Col>
          <center>
            <div className="buttons">
              <Button onClick={onConsent}>{t("consentGiven")}</Button>
            </div>{" "}
          </center>
        </Col>
      </Row>
    </Container>
  );
};
