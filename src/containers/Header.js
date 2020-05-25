import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import NavLink from "./NavLink";
import { selectRoot, logout } from "react-formio";
import { useTranslation } from "react-i18next";
import { Routes } from "../config";

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => selectRoot("auth", state));

  const { t } = useTranslation();

  const onLogout = () => {
    dispatch(logout());
    dispatch(push(Routes.auth));
  };

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
            <span
              className="nav-link"
              role="navigation link"
              onClick={onLogout}
            >
              <span className="fa fa-sign-out" />
              &nbsp;{" "}
              {t("Navbar:links.loggedInAndLogout", {
                user: auth.user.data.email,
              })}{" "}
              />
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
};

export default Header;
