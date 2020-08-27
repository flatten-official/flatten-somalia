import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Routes } from "../../../config";

const Success = () => {
  const { t } = useTranslation("Surveys");
  return (
    <h4>
      {t("success")}
      <Link to={Routes.home}> {t("returnHomePrompt")} </Link>
    </h4>
  );
};

export default Success;
