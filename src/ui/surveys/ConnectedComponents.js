import { connect } from "react-redux";
import Types from "./actionTypes";
import { ConsentModal } from "../components/surveys/ConsentModal";
import { LocationPicker } from "../components/surveys/location/LocationPicker";
import { FollowUpId } from "../components/surveys/FollowUpId";

const mapDispatchToPropsConsent = (dispatch) => ({
  onConsent: () => {
    dispatch({ type: Types.NOTIFY_CONSENT_GIVEN });
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
