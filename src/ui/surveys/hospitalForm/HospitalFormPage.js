import { useTranslation } from "react-i18next";
import React from "react";
import FormDef from "../../../forms/HospitalForm.json";
import FormPage from "../../components/FormPage";

const HospitalFormPage = () => {
  const { t } = useTranslation("HospitalForm");

  const onSubmit = (formIoData) => {
    throw Error("Submission not implemented.");
  };

  return (
    <FormPage formDef={FormDef} submitHook={onSubmit} title={t("title")} />
  );
};

export default HospitalFormPage;
