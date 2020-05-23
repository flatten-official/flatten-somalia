import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import NavLink from "./NavLink";
import { selectRoot, logout } from "react-formio";
import { Routes } from "../config";
import { Translate } from "react-redux-i18n";

const Header = ({ auth, logout }) => (
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
            &nbsp; <Translate value="Navbar.links.adminPanel" />
          </NavLink>
        ) : null}
      </ul> */}
      {auth.authenticated ? (
        <ul className="nav navbar-nav mr-auto">
          <span className="nav-link" role="navigation link" onClick={logout}>
            <span className="fa fa-sign-out" />
            &nbsp; <Translate value="Navbar.links.loggedInAndLogout" user={auth.user.data.email} />
          </span>
        </ul>
      ) : (
        <ul className="nav navbar-nav mr-auto">
          <NavLink to="/auth" role="navigation link" className="nav-link">
            <Translate value="Navbar.links.login" />
          </NavLink>
        </ul>
      )}
    </div>
  </nav>
);

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: selectRoot("auth", state),
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout());
    dispatch(push(Routes.auth));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
