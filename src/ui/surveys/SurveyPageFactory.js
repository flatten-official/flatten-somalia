import Form from "../components/surveys/formio/Form";
import React from "react";
import { push } from "connected-react-router";
import { Routes } from "../../config";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Types from "./actionTypes";
import Loading from "../components/Loading";
import PropTypes from "prop-types";
import {
  ConnectedConsent,
  ConnectedLocationPicker,
} from "./ConnectedComponents";

/**
 * This function generates a survey page.
 * @param config pass in the configuration object for that form
 */
const SurveyPageFactory = ({
  surveyKey,
  i18nTitleKey,
  formIOJSON,
  onSubmit,
}) => {
  // NEED TO USE A CLASS CAUSE FUCKING STALE CLOSURES
  class SurveyPageContent extends React.Component {
    constructor(props) {
      super(props);
      this.props.restartForm();
    }

    submitHook = async (formIOData) => {
      await onSubmit(this.props.surveyData, formIOData);
      this.props.redirectToSuccess();
    };

    render() {
      if (!this.props.surveyData) return <Loading />;

      if (!this.props.surveyData.consent) return <ConnectedConsent />;

      if (!this.props.surveyData.location) return <ConnectedLocationPicker />;

      console.log("3" + JSON.stringify(this.props.surveyData));

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

    return (
      <>
        <h3 className="submissionPageTitle">{t(i18nTitleKey)}</h3>
        <SurveyPageContentConnected />
      </>
    );
  };

  return SurveyPage;
};

export default SurveyPageFactory;
