import React from "react";
import { Link, withRouter, matchPath } from "react-router-dom";
import PropTypes from "prop-types";

const NavLink = ({ to, location, exact, role, className, children }) => {
  const liClass = matchPath(location.pathname, {
    path: to,
    exact,
    strict: false,
  })
    ? "nav-item active"
    : "nav-item";

  return (
    <li className={liClass}>
      <Link {...{ to, role, className }}>{children}</Link>
    </li>
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
