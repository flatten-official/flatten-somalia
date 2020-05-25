import React from "react";
import { useTranslation } from "react-i18next";
import { Routes } from "../config";
import { Link } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Link to={Routes.submission}>{t("Home:goToSubmissionText")}</Link>
    </>
  );
};

export default Home;
