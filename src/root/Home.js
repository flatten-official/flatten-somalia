import React from "react";
import { connect } from "react-redux";
import { Translate } from "react-redux-i18n";
import { PropTypes } from "prop-types";
import VolunteerForm from "./VolunteerForm";
import Auth from "../../auth/Auth";
import { selectRoot } from "react-formio";
import { FormConfig } from "../../config";
import { push } from "connected-react-router";
import { Routes } from '../../config';

const Home = ({ auth, pushToLogin }) => {

  // todo - add this forcing when we have authentication working
  // pushToLogin();

  return (
  <>
    <VolunteerForm {...FormConfig.volunteerForm} />
  </>
)
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  pushToLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: selectRoot("auth", state),
});

const mapDispatchToProps = (dispatch) => ({
  pushToLogin: ()=>{dispatch(push(Routes.auth));}
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
