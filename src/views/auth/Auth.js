import React from "react";
import {connect} from "react-redux"
import { PropTypes } from "prop-types";
import Login from "./Login";
import { Translate } from "react-redux-i18n";
import EN from '../../translations/en/Auth'
import SO from '../../translations/so/Auth'

const Auth = ({locale}) => {
  return (
    <div>
      <div className="panel-heading card-header"> <Translate value='Auth.loginForm.title'/> </div>
      <div className="panel-body card-body">
        <Login options={{ language: locale, i18n: {en: EN.loginForm, so: SO.loginForm} }}/>
      </div>
    </div>
  );
};

Auth.propTypes = {
    locale: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ locale: state.i18n.locale });

export default connect(mapStateToProps) (Auth);
