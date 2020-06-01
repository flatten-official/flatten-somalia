import React from "react";
import { useTranslation } from "react-i18next";
import { Routes } from "../config";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout, AUTH_SUCCESS } from "../auth/authActions";

const Header = () => {
  const { t } = useTranslation("Navbar");
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Navbar className="header" expand="lg">
      <LinkContainer to={Routes.home}>
        <Navbar.Brand>
          <h3 className="wordmark">v.FLATTEN.org</h3>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {auth.status === AUTH_SUCCESS ? (
            <>
              <LinkContainer to={Routes.home}>
                <Nav.Link>{t("links.homepage")}</Nav.Link>
              </LinkContainer>
              <Nav.Link className="ml-auto" onClick={() => dispatch(logout())}>
                {t("links.logout")}
              </Nav.Link>
            </>
          ) : (
            <LinkContainer to={Routes.auth}>
              <Nav.Link>{t("links.login")}</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
