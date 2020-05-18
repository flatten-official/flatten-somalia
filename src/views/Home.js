import React  from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import VolunteerForm from "./Form/VolunteerForm";
import Auth from "./Auth/Auth";
import { selectRoot } from "react-formio";
import { FormConfig } from "../config";

const checkFormRoles = (auth) => {
  let access;
  try {
    access =
      auth.submissionAccess[FormConfig.volunteerForm.formPath].create_own;
  } catch {
    return false;
  }
  for (let role of auth.user.roles) {
    if (access.indexOf(role) > -1) return true;
  }
  return false;
};

const Home = ({ auth }) => (
  <div>
    {auth.is.authenticated ? (
      <div className="well text-center">
        {(auth.user && auth.user.data) ? (
          <div>
            <h3>
              You are logged in as&nbsp;
              <strong>{auth.user.data.email}</strong>!
            </h3>
            {checkFormRoles(auth) ? (
              <VolunteerForm {...FormConfig.volunteerForm} />
            ) : (
              <h3>
                <br/>
                You do not have permission to access this form. Please contact
                an admin to get access.
              </h3>
            )}
          </div>
        ) : null}
      </div>
    ) : (
      <Auth />
    )}
  </div>
);

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: selectRoot("auth", state),
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
