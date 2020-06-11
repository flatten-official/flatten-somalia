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
import { ConsentModal } from "../components/surveys/ConsentModal";
import { LocationPicker } from "../components/surveys/location/LocationPicker";
import { FollowUpId } from "../components/surveys/FollowUpId";

const mapDispatchToPropsConsent = (dispatch) => ({
  onConsent: () => {
    dispatch({ type: Types.NOTIFY_CONSENT_GIVEN });
    /** TODO we're planning to build a more robust timing system that measures from before consent page.
     * this will then need to be changed
     */
    dispatch({ type: Types.SET_START_TIME, payload: Date.now() });
  },
});

const mapDispatchToPropsLocationPicker = (dispatch) => ({
  onLocationFound: (location) =>
    dispatch({ type: Types.SET_LOCATION, payload: location }),
});

const mapStateToPropsFollowUpId = (state) => ({
  volunteerFriendlyId: state.auth.user.friendlyId,
  followUpId: state.surveys[state.surveys.activeSurvey].followUpId,
});

const mapDispatchToPropsFollowUpId = (dispatch) => ({
  setFollowUpId: (followUpId) =>
    dispatch({ type: Types.SET_FOLLOW_UP_ID, payload: followUpId }),
});

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
