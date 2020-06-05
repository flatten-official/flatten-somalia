import { useTranslation } from "react-i18next";
import React from "react";
import FormDef from "../../../forms/GraveDiggerForm";
import FormPage from "../../components/FormPage";

const GraveDiggerPage = () => {
  const { t } = useTranslation("GravediggerSurvey");

  const onSubmit = (formIoData) => {
    throw Error("Submission not implemented.");
  };

  return (
    <FormPage formDef={FormDef} submitHook={onSubmit} title={t("title")} />
  );
};

export default GraveDiggerPage;
