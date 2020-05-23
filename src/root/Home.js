import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import VolunteerForm from "./VolunteerForm";
import { FormConfig, Routes } from "../config";
import { hasPermission } from "../auth/authApi";
import { NavLink } from "react-router-dom";

const Home = ({ auth }) => (
  <>
    {hasPermission(auth, "submitForms") ? (
      <VolunteerForm {...FormConfig.volunteerForm} />
    ) : (
      <p>Not authorised.</p>
    )}
  </>
);

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
