import Form from "../components/surveys/formio/Form";
import React, { useEffect } from "react";
import { push } from "connected-react-router";
import { Routes } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { submitForm } from "../../backend/submission";
import Types from "./actionTypes";
import Loading from "../components/Loading";
import {
  ConnectedConsent,
  ConnectedLocationPicker,
} from "./ConnectedComponents";

/**
 * This function generates a survey page.
 * @param config pass in the configuration object for that form
 */
const SurveyPageFactory = ({ surveyKey, i18nTitleKey, api, formIOJSON }) => {
  const SurveyPageContent = () => {
    const surveyData = useSelector((state) => state.surveys[surveyKey]);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({ type: Types.RESTART_SURVEY, payload: surveyKey });
    }, [dispatch]);

    if (!surveyData) return <Loading />;

    if (!surveyData.consent) return <ConnectedConsent />;

    if (!surveyData.location) return <ConnectedLocationPicker />;

    const onSubmit = async (formIOData) => {
      await submitForm(surveyData, formIOData);
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
