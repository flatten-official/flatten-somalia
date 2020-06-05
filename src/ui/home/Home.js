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
        {t("goToInitialSurvey")}
      </Button>
      <Button variant="light" size="lg" href={Routes.graveDiggerSurvey}>
        {t("goToGraveDiggerForm")}
      </Button>
      <Button variant="light" size="lg" href={Routes.hospitalSurvey}>
        {t("goToGraveDiggerForm")}
      </Button>
      {/*<Button variant="light" size="lg" href={null} disabled="true">*/}
      {/*  {t("goToGravediggerSurvey")}*/}
      {/*</Button>*/}
      {/*/!*TODO there should be a check for if there are follow ups and a notification will show*!/*/}
      {/*<Button variant="light" size="lg" href={null} disabled="true">*/}
      {/*  {t("goToFollowupSurvey")}*/}
      {/*</Button>*/}
      {/* Don't know if theres a more secure/better way to do this auth.user.permissions.includes(
            "manageVolunteers"
          ) && <Link to={null}>{t("goToAddVolunteer")}</Link> */}
    </>
  );
};

export default Home;
