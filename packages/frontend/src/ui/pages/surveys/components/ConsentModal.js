import { Trans, useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";

export const ConsentModal = ({ onConsent }) => {
  const { t } = useTranslation("Surveys");

  return (
    <>
      {t("braConsent")}
      <br />
      <br />
      <Trans i18nKey="Surveys:flattenConsent">
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

ConsentModal.propTypes = {
  onConsent: PropTypes.func,
};
