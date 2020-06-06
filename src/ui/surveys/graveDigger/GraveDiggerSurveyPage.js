import { useTranslation } from "react-i18next";
import React from "react";
import FormDef from "../../../forms/GraveDiggerForm";
import SurveyPage from "../../components/SurveyPage";
import backend from "../../../backend/api/backend";
import flattenApi from "../../../backend/api/api";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { Routes } from "../../../config";

const GraveDiggerSurveyPage = () => {
  const { t } = useTranslation("GraveDiggerForm");
  const dispatch = useDispatch();

  const onSubmit = async (formIoData) => {
    await backend.request({
      ...flattenApi.graveDiggerSurvey,
      data: formIoData,
    });
    dispatch(push(Routes.success));
  };

  return (
    <SurveyPage formDef={FormDef} submitHook={onSubmit} title={t("title")} />
  );
};

export default GraveDiggerSurveyPage;
