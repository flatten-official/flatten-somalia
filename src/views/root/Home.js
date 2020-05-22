import React from "react";
import { connect } from "react-redux";
import { Translate } from "react-redux-i18n";
import { PropTypes } from "prop-types";
import VolunteerForm from "./VolunteerForm";
import Auth from "../auth/Auth";
import { selectRoot } from "react-formio";
import { FormConfig } from "../../config";
import { push } from "connected-react-router";

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

const Home = ({ auth, pushToLogin }) => {

  // todo - add this forcing when we have authentication working
  // pushToLogin();

  return (
  <>
    <VolunteerForm {...FormConfig.volunteerForm} />
    {/* {auth.is.authenticated && auth.user && auth.user.data ? (
      <div className="well text-center">
        <h3>
         <Translate value={'loggedInAs'}/>&nbsp;
          <strong>{auth.user.data.email}</strong>
        </h3>
        {checkFormRoles(auth) ? (
          <VolunteerForm {...FormConfig.volunteerForm} />
        ) : (
          <h3>
            <Translate value={'cannotAccessFormMessage'}/>
          </h3>
        )}
      </div>
    ) : (
      <Auth />
    )} */}
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
  pushToLogin: ()=>{dispatch(push('auth'));}
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
