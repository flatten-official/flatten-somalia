import { useTranslation } from "react-i18next";
import React from "react";
import FormDef from "../../../forms/GraveDiggerForm";
import SurveyPage from "../../components/SurveyPage";

const GraveDiggerSurveyPage = () => {
  const { t } = useTranslation("GraveDiggerForm");

  const onSubmit = (formIoData) => {
    throw Error("Submission not implemented.");
  };

  return (
    <SurveyPage formDef={FormDef} submitHook={onSubmit} title={t("title")} />
  );
};

export default GraveDiggerSurveyPage;
