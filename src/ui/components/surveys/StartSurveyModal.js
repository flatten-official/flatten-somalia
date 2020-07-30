import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";
import { useExpireSoonCheck } from "../../util/customHooks";

export const StartSurveyModal = ({ onStartSurvey }) => {
  const { t } = useTranslation("Surveys");

  useExpireSoonCheck(30);

  return (
    <>
      <h4>{t("startSurveyPreamble")}</h4>
      <br />
      <Button variant="light" size="lg" onClick={onStartSurvey}>
        {t("startSurvey")}
      </Button>
    </>
  );
};

StartSurveyModal.propTypes = {
  onStartSurvey: PropTypes.func,
};
