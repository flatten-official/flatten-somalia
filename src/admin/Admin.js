import React from "react";
import { connect } from "react-redux";
import { Translate } from "react-redux-i18n";
import { PropTypes } from "prop-types";
import { selectRoot } from "react-formio";
import { AUTH_SUCCESS } from "../auth/authActions";
import EN from "../translations/en/Admin"
import SO from "../translations/so/Admin"

const Admin = ({ auth, locale }) => (
  <>
    {/* TODO - change this depending on what the eventual shape of the permissions object is. */}
    {auth.status == AUTH_SUCCESS && auth.user.permissions.indexOf('admin') > -1 ? (
      <>
        <h2><Translate value={"Admin.welcomeHeader"}/></h2>
        <br/>
      </>
    ) : (
      <h3> <Translate value={"Admin.unauthorized"}/> </h3>
    )}
  </>
);

Admin.propTypes = {
  auth: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  auth: selectRoot("auth", state),
  locale: state.i18n.language
});

export default connect(mapStateToProps)(Admin);
