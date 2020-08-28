import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Routes, Surveys } from "../../config";
import Button from "react-bootstrap/Button";
import { permissions } from "../../backend/auth/authApi";

const Home = () => {
  const { t } = useTranslation("Home");
  const { t: tSurvey } = useTranslation("Surveys");
  const showAddVolunteers = useSelector(
    (state) =>
      state.auth.user.permissions.indexOf(permissions.manageVolunteers) > -1
  );

  return (
    <>
      <h3 className="homePageTitle">
        <b>{t("welcome")}</b>
      </h3>
      <h5 className="homePageSelectFormTitle">{t("formSelectionPrompt")}</h5>
      <Button variant="light" size="lg" href={Routes.initialHouseholdSurvey}>
        {tSurvey(Surveys.initialHousehold.i18nTitleKey)}
      </Button>
      <Button variant="light" size="lg" href={Routes.gravediggerSurvey}>
        {tSurvey(Surveys.gravedigger.i18nTitleKey)}
      </Button>
      <Button variant="light" size="lg" href={Routes.hospitalSurvey}>
        {tSurvey(Surveys.hospital.i18nTitleKey)}
      </Button>
      {showAddVolunteers ? (
        <Button variant="light" size="lg" href={Routes.addVolunteer}>
          {tSurvey(Surveys.addVolunteer.i18nTitleKey)}
        </Button>
      ) : null}
    </>
  );
};

export default Home;
