import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { selectRoot } from "react-formio";
import { AUTH_SUCCESS } from "../auth/authActions";
import { useTranslation } from "react-i18next";

const Admin = ({ auth }) => {
  let { t } = useTranslation();
  return (
    <>
      {/* TODO - change this depending on what the eventual shape of the permissions object is. */}
      {auth.status === AUTH_SUCCESS &&
      auth.user.permissions.indexOf("admin") > -1 ? (
        <>
          <h2>
            {t("Admin:welcomeHeader")}
          </h2>
          <br />
        </>
      ) : (
        <h3>
          {" "} {t("Auth:unauthorized")} {" "}
        </h3>
      )}
    </>
  );
}

Admin.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: selectRoot("auth", state)
});

export default connect(mapStateToProps)(Admin);