import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import VolunteerForm from "./VolunteerForm";
import { FormConfig, Routes } from "../config";
import { push } from "connected-react-router";
import { AUTH_SUCCESS } from "../auth/authActions";

const Home = ({ auth, pushToAuth }) => {
  if (!(auth.status === AUTH_SUCCESS)) {
    pushToAuth();
  }

  return (
    <>
      <VolunteerForm {...FormConfig.volunteerForm} />
    </>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  pushToAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  pushToAuth: () => {
    dispatch(push(Routes.auth));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
