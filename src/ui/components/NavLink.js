import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav } from "react-bootstrap";
import PropTypes from "prop-types";

const NavLink = ({ to, location, exact, role, className, children }) => {
  return (
    <Nav.Link>
      <Link {...{ to, role, className }}>{children}</Link>
    </Nav.Link>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
};

export default withRouter((props) => <NavLink {...props} />);
