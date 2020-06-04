import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setFollowUpId, Types } from "../actions";
import { Button } from "react-bootstrap";
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
