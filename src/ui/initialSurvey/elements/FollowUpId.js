import { useSelector } from "react-redux";
import React from "react";
import { useTranslation } from "react-i18next";

const FollowUpId = () => {
  const followUpId = useSelector((state) => state.volunteerForm.followUpId);
  const { t } = useTranslation("InitialSurvey");
  return (
    <>
      <h3>{t("askToGiveFollowUpId")}</h3>
      <h2>{followUpId}</h2>
    </>
  );
};

export default FollowUpId;
