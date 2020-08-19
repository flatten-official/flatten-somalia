/**
 * This file contains (HOC) components that connect the reusable
 * components (e.g. LocationPicker, ConsentModal) to the survey's Redux store.
 * This is done because we want separation between the standalone components
 * and the surveys "business logic". The "Connected" components use the
 * normal React-Redux HOC design pattern with mapDispatchToProps and
 * mapStateToProps.
 */

import { connect } from "react-redux";
import Types from "./actionTypes";
import { ConsentModal } from "./components/ConsentModal";
import { StartSurveyModal } from "./components/StartSurveyModal";
import { LocationPicker } from "./components/location/LocationPicker";
import { FollowUpId } from "./components/FollowUpId";
import {
  checkSessionExpiry,
  fetchAuthState,
  UNAUTHENTICATED_CONTEXT,
} from "../../appActions";

const mapDispatchToPropsConsent = (dispatch) => ({
  onConsent: () => {
    dispatch({ type: Types.NOTIFY_CONSENT_GIVEN });
    dispatch({ type: Types.SET_CONSENT_TIME, payload: Date.now() });
  },
});

const mapDispatchToPropsStartSurvey = (dispatch) => ({
  onStartSurvey: () => {
    // Verifies that user is still logged in and that the session won't expire soon before starting the survey.
    // If the fetchAuthState request fails it won't log the user out
    dispatch(
      fetchAuthState(UNAUTHENTICATED_CONTEXT.badCookie, false)
    ).then(() => dispatch(checkSessionExpiry(30)));

    // Don't wait for authentication to finish before starting survey
    dispatch({ type: Types.NOTIFY_STARTED });
    dispatch({ type: Types.SET_START_TIME, payload: Date.now() });
  },
});

const mapDispatchToPropsLocationPicker = (dispatch) => ({
  onLocationFound: (location) => {
    dispatch({ type: Types.SET_LOCATION, payload: location });
    dispatch({ type: Types.SET_LOCATION_TIME, payload: Date.now() });
  },
});

const mapStateToPropsFollowUpId = (state) => ({
  volunteerFriendlyId: state.auth.user.friendlyId,
  followUpId: state.surveys[state.surveys.activeSurvey].followUpId,
});

const mapDispatchToPropsFollowUpId = (dispatch) => ({
  setFollowUpId: (followUpId) =>
    dispatch({ type: Types.SET_FOLLOW_UP_ID, payload: followUpId }),
});

export const ConnectedStartSurvey = connect(
  null,
  mapDispatchToPropsStartSurvey
)(StartSurveyModal);

export const ConnectedConsent = connect(
  null,
  mapDispatchToPropsConsent
)(ConsentModal);

export const ConnectedLocationPicker = connect(
  null,
  mapDispatchToPropsLocationPicker
)(LocationPicker);

export const ConnectedFollowUpId = connect(
  mapStateToPropsFollowUpId,
  mapDispatchToPropsFollowUpId
)(FollowUpId);
