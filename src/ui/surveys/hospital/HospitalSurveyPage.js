import { useTranslation } from "react-i18next";
import React from "react";
import FormDef from "../../../forms/HospitalForm.json";
import SurveyPage from "../../components/SurveyPage";
import backend from "../../../backend/api/backend";
import flattenApi from "../../../backend/api/api";
import { push } from "connected-react-router";
import { Routes } from "../../../config";
import { useDispatch } from "react-redux";

const HospitalSurveyPage = () => {
  const { t } = useTranslation("HospitalForm");
  const dispatch = useDispatch();

  const onSubmit = async (formIoData) => {
    await backend.request({
      ...flattenApi.hospitalSurvey,
      data: formIoData,
    });
    dispatch(push(Routes.success));
  };

  return (
    <SurveyPage formDef={FormDef} submitHook={onSubmit} title={t("title")} />
  );
};

export default HospitalSurveyPage;
