import React from "react";
import { useTranslation } from "react-i18next";
import { Routes, Surveys } from "../../config";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

const Home = () => {
  const { t } = useTranslation("Home");
  const authUser = useSelector((state) => state.auth.user);
  const { t: tSurvey } = useTranslation("Surveys");

  return (
    <>
      <h3 className="homePageTitle">
        <b>{t("welcome")}</b>
      </h3>
      <h5 className="homePageSubheadingsBlue">{t("nameMessageTitle")}</h5>
      <h5 className="homePageSubheadings">
        {t("nameMessageResponse", { name: authUser.name })}
      </h5>{" "}
      <br />
      <h5 className="homePageSubheadingsBlue">{t("teamNameMessageTitle")}</h5>
      <h5 className="homePageSubheadings">
        {t("teamNameMessageResponse", { teamName: authUser.teamName })}
      </h5>{" "}
      <br />
      <h5 className="homePageSelectFormTitle">{t("formSelectionPrompt")}</h5>
      <Button variant="light" size="lg" href={Routes.initialHouseholdSurvey}>
        {tSurvey(Surveys.initialHousehold.i18nTitleKey)}
      </Button>
      <Button
        disabled={true}
        variant="light"
        size="lg"
        href={Routes.gravediggerSurvey}
      >
        {tSurvey(Surveys.gravedigger.i18nTitleKey)}
      </Button>
      <Button
        disabled={true}
        variant="light"
        size="lg"
        href={Routes.hospitalSurvey}
      >
        {tSurvey(Surveys.hospital.i18nTitleKey)}
      </Button>
    </>
  );
};

export default Home;
