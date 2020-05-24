import React, { useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import VolunteerForm from "./VolunteerForm";
import { FormConfig, Routes } from "../config";
import { hasPermission } from "../auth/authApi";
import { useTranslation } from "react-i18next";
import { Button, Container, Row, Col } from "react-bootstrap";

const SubmissionPage = ({ auth }) => {
    let { t } = useTranslation();
    const [started, setStarted] = useState(false);
    const [consented, setConsented] = useState(false);

    const startForm = () => {
        setStarted(true);
        setConsented(true);
    }

    if (!started) {
        return (
        <Container>
            <Row>
                <Col>{t("VolunteerForm:consent")}</Col>
            </Row>
            <Row>
                <Button variant="primary" onClick={startForm}>{t("VolunteerForm:givesConsent")}</Button>{' '}
            </Row>
        </Container>
        );
    }

    return <VolunteerForm {...FormConfig.volunteerForm} consentGiven={consented} />;
};

export default SubmissionPage;
