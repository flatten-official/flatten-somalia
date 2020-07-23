import React from "react";
import { useTranslation } from "react-i18next";
import { Routes } from "../../config";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout, AUTH_AUTHENTICATED } from "../../backend/auth/authActions";

const LanguageDropDown = () => {
  const { t, i18n } = useTranslation("Navbar");

  const setLanguage = (lang) => (e) => {
    e.preventDefault();
    i18n.changeLanguage(lang);
  };

  return (
    <Nav className="justify-content-end">
      <NavDropdown id="dropdown-menu" title={t("language")}>
        <NavDropdown.Item onClick={setLanguage("so")}>
          Soomaali
        </NavDropdown.Item>
        <NavDropdown.Item onClick={setLanguage("en")}>English</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

const Links = () => {
  const { t } = useTranslation("Navbar");
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  if (auth.status === AUTH_AUTHENTICATED)
    return (
      <>
        <LinkContainer to={Routes.home}>
          <Nav.Link>{t("links.homepage")}</Nav.Link>
        </LinkContainer>
        <Nav.Link className="ml-auto" onClick={() => dispatch(logout())}>
          {t("links.logout")}
        </Nav.Link>
      </>
    );
  else
    return (
      <LinkContainer to={Routes.auth}>
        <Nav.Link>{t("links.login")}</Nav.Link>
      </LinkContainer>
    );
};

const Header = () => {
  return (
    <Navbar className="header" expand="lg">
      <LinkContainer to={Routes.home}>
        <Navbar.Brand className="wordmark">
          <h4>FLATTEN</h4>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Links />
        </Nav>
        <LanguageDropDown />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
