import { useTranslation } from "react-i18next";
import React from "react";
import FormDef from "../../../forms/HospitalForm.json";
import SurveyPage from "../../components/SurveyPage";

const HospitalSurveyPage = () => {
  const { t } = useTranslation("HospitalForm");

  const onSubmit = (formIoData) => {
    throw Error("Submission not implemented.");
  };

  return (
    <SurveyPage formDef={FormDef} submitHook={onSubmit} title={t("title")} />
  );
};

export default HospitalSurveyPage;
