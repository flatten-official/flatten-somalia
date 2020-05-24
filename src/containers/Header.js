import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import NavLink from "./NavLink";
import { selectRoot, logout } from "react-formio";
import { useTranslation } from "react-i18next";
import { Routes } from "../config";

const Header = ({ auth, logout }) => {
  let { t } = useTranslation()
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h3 className="wordmark">FLATTEN.so</h3>
        </Link>
        {/* TODO - refactor this mess, and get it working with new login system! */}
        {/* <ul className="nav navbar-nav mr-auto">
        {auth.is.hasOwnProperty("administrator") && auth.is.administrator ? (
          <NavLink to="/admin" role="navigation link" className="nav-link">
            <i className="fa fa-unlock-alt" />
              &nbsp; {t("Navbar:links.adminPanel")}
          </NavLink>
        ) : null}
      </ul> */}
        {auth.authenticated ? (
          <ul className="nav navbar-nav mr-auto">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <span className="nav-link" role="navigation link" onClick={logout}>
            <span className="fa fa-sign-out"/>
              &nbsp;{" "} {t("Navbar:links.loggedInAndLogout", { user: auth.user.data.email })} />
          </span>
          </ul>
        ) : (
          <ul className="nav navbar-nav mr-auto">
            <NavLink to="/auth" role="navigation link" className="nav-link">
              {t("Navbar:links.login")}
            </NavLink>
          </ul>
        )}
      </div>
    </nav>
  );
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ( {
  auth: selectRoot("auth", state),
} );

const mapDispatchToProps = (dispatch) => ( {
  logout: () => {
    dispatch(logout());
    dispatch(push(Routes.auth));
  },
} );

export default connect(mapStateToProps, mapDispatchToProps)(Header);