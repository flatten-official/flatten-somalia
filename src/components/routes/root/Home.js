import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import VolunteerForm from "./VolunteerForm";
import Auth from "../auth/Auth";
import { selectRoot } from "react-formio";
import { FormConfig } from "../../../config";

const checkFormRoles = (auth) => {
  let access;
  try {
    access =
      auth.submissionAccess[FormConfig.volunteerForm.formName].create_own;
  } catch {
    return false;
  }
  for (let role of auth.user.roles) {
    if (access.indexOf(role) > -1) return true;
  }
  return false;
};

const Home = ({ auth }) => (
  <>
    {auth.is.authenticated && auth.user && auth.user.data ? (
      <div className="well text-center">
        <h3>
          You are logged in as&nbsp;
          <strong>{auth.user.data.email}</strong>!
        </h3>
        {checkFormRoles(auth) ? (
          <VolunteerForm {...FormConfig.volunteerForm} />
        ) : (
          <h3>
            You do not have permission to access this form. Please contact an
            admin to get access.
          </h3>
        )}
      </div>
    ) : (
      <Auth />
    )}
  </>
);

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: selectRoot("auth", state),
});

export default connect(mapStateToProps)(Home);
