import React from "react";
import { connect } from "react-redux";
import { Translate } from "react-redux-i18n";
import { PropTypes } from "prop-types";
import { selectRoot } from "react-formio";
import EN from "../translations/en/Admin"
import SO from "../translations/so/Admin"

const Admin = ({ auth, locale }) => (
  <>
    {auth.is.administrator ? (
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
