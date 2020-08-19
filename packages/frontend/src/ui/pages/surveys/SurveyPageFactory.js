import Form from "../../commonComponents/formio/Form";
import React, { useEffect } from "react";
import { Prompt } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Types from "./actionTypes";
import PropTypes from "prop-types";
import {
  ConnectedStartSurvey,
  ConnectedConsent,
  ConnectedLocationPicker,
} from "./ConnectedComponents";
import { logout, UNAUTHENTICATED_CONTEXT } from "../../appActions";

/**
 * This function returns a survey page component.
 * @param surveyKey a string representing the form
 * @param i18nTitleKey the i18next key for the form title
 * @param formIOJSON the JSON formIO definition
 * @param onSubmit called with the form data when the form is submitted
 * @param options object containing details on specific form (e.g. should we use manual location picker)
 */
const SurveyPageFactory = ({
  surveyKey,
  i18nTitleKey,
  formIOJSON,
  onSubmit,
  options,
}) => {
  // Need to use a Class rather than functional components
  // Since the functional component was running into stale closure issues.
  class SurveyPageContent extends React.Component {
    constructor(props) {
      super(props);
      this.props.restartSurvey(); // Reset the form when the component is first loaded
    }

    onNextPage = (info) => {
      // Note: This if statement ensure timings won't update if a time already exists
      // This ensures going back and forth between pages doesn't overwrite the time the person spent on a page initially
      if (this.props.surveyData.pageTimings[info.page] === undefined)
        this.props.recordPageTiming(info.page, Date.now());
    };

    /**
     * Submits the survey to the backend and if no error is thrown will then update the Redux store to notify that the survey was completed
     */
    submitHook = async (formIOData) => {
      try {
        await onSubmit(this.props.surveyData, formIOData);
      } catch (e) {
        // If error is 401, session is invalid so logout user
        if (e.response && e.response.status === 401) this.props.logout();
        else throw e;
      }
      this.props.notifyCompleted();
    };

    render() {
      const { surveyData } = this.props;

      // Although the surveyData is initialized in the constructor,
      // the props aren't updated till the second render and therefore, this.props.surveyData is null
      // on the first render
      if (!surveyData) return null;

      if (!surveyData.started) return <ConnectedStartSurvey />;

      if (!surveyData.consent) return <ConnectedConsent />;

      // Use undefined rather than "not" since if location is not found will set to null
      if (surveyData.location === undefined)
        return (
          <ConnectedLocationPicker
            enableManual={options.enableManualLocation}
          />
        );

      return (
        <Form
          formioForm={formIOJSON}
          submitHook={this.submitHook}
          formioOptions={{ noAlerts: false }}
          onNextPage={this.onNextPage}
        />
      );
    }
  }

  SurveyPageContent.propTypes = {
    surveyData: PropTypes.object,
    notifyCompleted: PropTypes.func,
    restartSurvey: PropTypes.func,
    recordPageTiming: PropTypes.func,
    logout: PropTypes.func,
  };

  const mapStateToProps = (state) => ({
    surveyData: state.surveys[state.surveys.activeSurvey],
  });

  const mapDispatchToProps = (dispatch) => ({
    restartSurvey: () =>
      dispatch({ type: Types.RESTART_SURVEY, payload: surveyKey }),
    notifyCompleted: () => dispatch({ type: Types.NOTIFY_COMPLETED_SURVEY }),
    recordPageTiming: (pageNum, time) =>
      dispatch({ type: Types.ADD_PAGE_TIMING, payload: { pageNum, time } }),
    logout: () => dispatch(logout(false, UNAUTHENTICATED_CONTEXT.badCookie)),
  });

  const SurveyPageContentConnected = connect(
    mapStateToProps,
    mapDispatchToProps
  )(SurveyPageContent);

  // noinspection UnnecessaryLocalVariableJS
  const SurveyPage = () => {
    const { t } = useTranslation("Surveys");

    // shouldWarn determines whether the leave page warnings should be enable
    const shouldWarn = useSelector((state) => {
      const activeSurvey = state.surveys[state.surveys.activeSurvey];
      return activeSurvey && activeSurvey.started && !activeSurvey.completed;
    });

    useEffect(() => {
      setRefreshWarning(shouldWarn);
      return () => setRefreshWarning(false); // return the cleanup function
    }, [shouldWarn]);

    // Show a warning if page is refreshed
    const setRefreshWarning = (enabled) =>
      (window.onbeforeunload = enabled ? () => true : undefined);

    return (
      <>
        <h3 className="submissionPageTitle">{t(i18nTitleKey)}</h3>
        {/* Displays warning before react router tries to change the page */}
        <Prompt message={t("navWarning")} when={shouldWarn} />
        <SurveyPageContentConnected />
      </>
    );
  };

  return SurveyPage;
};

export default SurveyPageFactory;
