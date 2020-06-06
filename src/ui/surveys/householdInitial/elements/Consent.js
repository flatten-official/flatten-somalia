import { Trans, useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import React from "react";
import Types from "../../actionTypes";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const Consent = ({ onConsent }) => {
  const { t } = useTranslation("InitialSurvey"); // TODO Change to surveys

  return (
    <>
      {t("braConsent")}
      <br />
      <br />
      <Trans i18nKey="InitialSurvey:flattenConsent">
        MissingTranslation {/* Is replaced by i18n*/}
        <a href="https://flatten.ca/privacy-policy">Privacy Policy</a>
        and
        <a href="https://flatten.ca/terms-of-service">Terms of Service</a>.
      </Trans>
      <br />
      <br />
      <h4>{t("askForDataRecordingConsent")}</h4>
      <br />
      <Button variant="light" size="lg" onClick={onConsent}>
        {t("consentGiven")}
      </Button>
    </>
  );
};

Consent.propTypes = {
  onConsent: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onConsent: () => {
    dispatch({ type: Types.NOTIFY_CONSENT_GIVEN });
    dispatch({ type: Types.SET_START_TIME, payload: Date.now() });
  },
});

export const ConnectedConsent = connect(null, mapDispatchToProps)(Consent);
