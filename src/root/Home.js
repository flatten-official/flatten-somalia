import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import VolunteerForm from "./VolunteerForm";
import { FormConfig, Routes } from "../config";
import { hasPermission } from "../auth/authApi";
import { useTranslation } from "react-i18next";

const Home = ({ auth }) => {
  let { t } = useTranslation()
  return (
    <>
      {hasPermission(auth, "submitForms") ? (
        <VolunteerForm {...FormConfig.volunteerForm} />
      ) : (
        <p>{t('Auth:unauthorized')}</p>
      )}
    </>
  );
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);