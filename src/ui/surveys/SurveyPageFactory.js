import Form from "../components/formio/Form";
import React from "react";
import backend from "../../backend/api/backend";
import { push } from "connected-react-router";
import { Routes } from "../../config";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

/**
 * This function generates a survey page.
 * @param config pass in the configuration object for that form
 */
const SurveyPageFactory = ({ storeKey, i18nTitleKey, api, formIOJSON }) => {
  const SurveyPageContent = () => {
    const dispatch = useDispatch();

    const onSubmit = async (formIoData) => {
      await backend.request({
        ...api,
        data: formIoData,
      });
      dispatch(push(Routes.success));
    };

    return (
      <Form
        formioForm={formIOJSON}
        submitHook={onSubmit}
        formioOptions={{ noAlerts: false }}
      />
    );
  };

  // noinspection UnnecessaryLocalVariableJS
  const SurveyPage = () => {
    const { t } = useTranslation("Surveys");

    return (
      <>
        <h3 className="submissionPageTitle">{t(i18nTitleKey)}</h3>
        <SurveyPageContent />
      </>
    );
  };

  return SurveyPage;
};

export default SurveyPageFactory;
