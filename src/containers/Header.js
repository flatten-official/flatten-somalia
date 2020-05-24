import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import NavLink from "./NavLink";
import { useTranslation } from "react-i18next";
import { Routes } from "../config";
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import {LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {logout, AUTH_SUCCESS} from "../auth/authActions";


const Header = ( ) => {
  let { t } = useTranslation();
  let {auth} = useSelector(state=>state);
  const dispatch = useDispatch();

  return (
    <Navbar bg="light" expand="lg">
      <LinkContainer to={Routes.home}>
        <Navbar.Brand>
          <h3 className="wordmark">FLATTEN.so</h3>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to={Routes.home}>
            <Nav.Link>{t("Navbar:links:home")}</Nav.Link>
          </LinkContainer>
          <LinkContainer to={Routes.submission}>
            <Nav.Link>{t("Navbar:links:submitForm")}</Nav.Link>
          </LinkContainer>
          {
            auth.status === AUTH_SUCCESS ?
          <Nav.Link className="ml-auto" onClick={()=>dispatch(logout())} >{t("Navbar:links:logout")}</Nav.Link>
            :
            <LinkContainer to={Routes.auth}>
              <Nav.Link>{t("Navbar:links:login")}</Nav.Link>
            </LinkContainer>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default Header;
