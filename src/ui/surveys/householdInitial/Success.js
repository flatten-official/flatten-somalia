import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Success = () => {
  const { t } = useTranslation("InitialSurvey");
  return (
    <h3>
      {t("success")}
      <Link to="/"> {t("returnHomePrompt")} </Link>
    </h3>
  );
};

export default Success;
