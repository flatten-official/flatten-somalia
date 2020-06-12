import Form from "../components/surveys/formio/Form";
import React, { useEffect } from "react";
import { Prompt } from "react-router-dom";
import { push } from "connected-react-router";
import { Routes } from "../../config";
import { connect, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Types from "./actionTypes";
import Loading from "../components/Loading";
import PropTypes from "prop-types";
import {
  ConnectedConsent,
  ConnectedLocationPicker,
} from "./ConnectedComponents";

/**
 * This function returns a survey page component.
 * @param surveyKey a string representing the form
 * @param i18nTitleKey the i18next key for the form title
 * @param formIOJSON the JSON formIO definition
 * @param onSubmit called with the form data when the form is submitted
 */
const SurveyPageFactory = ({
  surveyKey,
  i18nTitleKey,
  formIOJSON,
  onSubmit,
}) => {
  // Need to use a Class rather than functional components
  // Since the functional component was running into stale closure issues.
  class SurveyPageContent extends React.Component {
    constructor(props) {
      super(props);
      this.props.restartForm(); // Reset the form when the component is first loaded
    }

    /**
     * Calls the onSubmit callback and if no error is thrown redirects to submit page
     */
    submitHook = async (formIOData) => {
      await onSubmit(this.props.surveyData, formIOData);
      this.props.redirectToSuccess();
    };

    render() {
      const surveyData = this.props.surveyData;

      if (!surveyData) return <Loading />;

      if (!surveyData.consent) return <ConnectedConsent />;

      if (!surveyData.location) return <ConnectedLocationPicker />;

      return (
        <Form
          formioForm={formIOJSON}
          submitHook={this.submitHook}
          formioOptions={{ noAlerts: false }}
        />
      );
    }
  }

  SurveyPageContent.propTypes = {
    surveyData: PropTypes.object,
    redirectToSuccess: PropTypes.func,
    restartForm: PropTypes.func,
  };

  const mapStateToProps = (state) => ({
    surveyData: state.surveys[state.surveys.activeSurvey],
  });

  const mapDispatchToProps = (dispatch) => ({
    restartForm: () =>
      dispatch({ type: Types.RESTART_SURVEY, payload: surveyKey }),
    redirectToSuccess: () => dispatch(push(Routes.success)),
  });

  const SurveyPageContentConnected = connect(
    mapStateToProps,
    mapDispatchToProps
  )(SurveyPageContent);

  // noinspection UnnecessaryLocalVariableJS
  const SurveyPage = () => {
    const { t } = useTranslation("Surveys");

    // sets it up so that once the user gives consent, they do not navigate away from the survey
    const shouldWarn = useSelector((state) => {
      const activeSurvey = state.surveys[state.surveys.activeSurvey];
      return activeSurvey && activeSurvey.consent;
    });

    useEffect(() => {
      if (shouldWarn === true) {
        console.log(`should warn true ${Date.now()}`);
        window.onbeforeunload = () => true;
      }
      return () => (window.onbeforeunload = undefined);
    }, [shouldWarn]);

    return (
      <>
        <h3 className="submissionPageTitle">{t(i18nTitleKey)}</h3>
        {/* Protects against route changes in the SPA */}
        <Prompt
          message={"Form is in the process of being filled out!"}
          when={shouldWarn}
        />
        <SurveyPageContentConnected />
      </>
    );
  };

  return SurveyPage;
};

export default SurveyPageFactory;
