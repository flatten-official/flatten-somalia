import { Trans, useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import React from "react";
import Types from "../../actionTypes";

export const Consent = () => {
  const { t } = useTranslation("InitialSurvey"); // TODO Change to surveys
  const dispatch = useDispatch();

  const onConsent = () => {
    dispatch({ type: Types.NOTIFY_CONSENT_GIVEN });
    dispatch({ type: Types.SET_START_TIME, payload: Date.now() });
  };

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
