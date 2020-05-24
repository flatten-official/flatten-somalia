import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Success = () => {
  let { t } = useTranslation();
  return (
    <>
      {t("VolunteerForm:success")}{" "}
      <Link to="/"> {t("VolunteerForm:returnHomePrompt")} </Link>
    </>
  );
};

export default Success;
