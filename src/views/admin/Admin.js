import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { selectRoot } from "react-formio";
import AddVolunteer from "./AddVolunteer"
import EN from "../../translations/en/Admin"
import SO from "../../translations/so/Admin"
import { useTranslation } from "react-i18next";

const Admin = ({ auth, locale }) => {
  let { t, i18n } = useTranslation();
  return (
    <>
      {auth.is.administrator ? (
        <>
          <h2>{t("Admin:welcomeHeader")}</h2>
          <br/>
          <AddVolunteer options={{ language: locale, i18n: {en: EN.addVolunteerForm, so: SO.addVolunteerForm} }} />
        </>
      ) : (
        <h3>
          {t("Admin:unauthorized")}
        </h3>
      )}
    </>
  );
}

Admin.propTypes = {
  auth: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  auth: selectRoot("auth", state),
  locale: state.i18n.language
});

export default connect(mapStateToProps)(Admin);
