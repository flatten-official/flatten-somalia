import React from "react";
import { useTranslation } from "react-i18next";
import { Routes } from "../../config";
import Button from "react-bootstrap/Button";

const Home = () => {
  const { t } = useTranslation("Home");

  return (
    <>
      <h3 className="homePageTitle">
        <b>{t("welcome")}</b>
      </h3>
      <h5 className="homePageSelectFormTitle">{t("formSelectionPrompt")}</h5>
      <Button variant="light" size="lg" href={Routes.initialHouseholdSurvey}>
        {t("InitialSurvey:title")}
      </Button>
      <Button variant="light" size="lg" href={Routes.graveDiggerSurvey}>
        {t("GravediggerSurvey:title")}
      </Button>
      <Button variant="light" size="lg" href={Routes.hospitalSurvey}>
        {t("HospitalSurvey:title")}
      </Button>
    </>
  );
};

export default Home;
