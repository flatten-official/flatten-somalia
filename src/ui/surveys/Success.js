import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Routes } from "../../config";

const Success = () => {
  const { t } = useTranslation("Surveys");
  return (
    <>
      {t("success")}
      <Link to={Routes.home}> {t("returnHomePrompt")} </Link>
    </>
  );
};

export default Success;
