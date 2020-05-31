import React, { useState } from "react";
import VolunteerForm from "./VolunteerForm";
import { FormConfig } from "../config";
import { useTranslation } from "react-i18next";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const SubmissionPage = () => {
  const { t } = useTranslation();
  const [started, setStarted] = useState(false);
  const [consented, setConsented] = useState(false);

  const startForm = () => {
    setStarted(true);
    setConsented(true);
  };

  if (!started) {
    return (
      <Container>
        <Row>
          <Col>
            <div className="seventypxmargin"></div>
            <center>
              <div className="body">{t("VolunteerForm:consent")}</div>
            </center>
          </Col>
        </Row>
        <Row>
          <Col>
            <center>
              <div className="buttons">
                <Link onClick={startForm}>
                  {t("VolunteerForm:givesConsent")}
                </Link>
              </div>{" "}
            </center>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <VolunteerForm {...FormConfig.volunteerForm} consentGiven={consented} />
  );
};

export default SubmissionPage;
