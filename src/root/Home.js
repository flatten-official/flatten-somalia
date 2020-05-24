import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { PropTypes } from "prop-types";
import VolunteerForm from "../form/VolunteerForm";
import { Routes } from "../config";
import { Link } from "react-router-dom";

const Home = ({ }) => {
  let auth = useSelector(state=>state.auth); // use the auth state from the store
  let { t } = useTranslation();

  return (
    <>
      <Link to={Routes.submission}>{t("Home:goToSubmissionText")}</Link>
    </>
  );
}

export default Home;