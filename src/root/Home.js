import React from "react";
import { useTranslation } from "react-i18next";
import { Routes } from "../config";
import Button from "react-bootstrap/Button";

const Home = () => {
  const { t, i18n } = useTranslation("Home");

  const toggleLanguage = (e) => {
    e.preventDefault();
    i18n.changeLanguage(i18n.language === "en" ? "so" : "en");
  };

  return (
    <>
      <center>
        <div className="seventypxmargin" />
        <div className="websitetitle">
          <b>{t("welcome")}</b>
        </div>
        <div className="fourtypxmargin" />
        <div className="heading">{t("formSelectionPrompt")}</div>
        <div className="twentypxmargin" />
        <Button variant="light" size="lg" href={Routes.submission}>
          {t("goToInitialSurvey")}
        </Button>
        <Button variant="light" size="lg" href={null} disabled="true">
          {t("goToGravediggerSurvey")}
        </Button>
        {/*TODO there should be a check for if there are follow ups and a notification will show*/}
        <Button variant="light" size="lg" href={null} disabled="true">
          {t("goToFollowupSurvey")}
        </Button>
        {/* Don't know if theres a more secure/better way to do this auth.user.permissions.includes(
            "manageVolunteers"
          ) && <Link to={null}>{t("goToAddVolunteer")}</Link> */}
        <div className="seventypxmargin" />
        <div className="heading">{t("languageTogglePrompt")}</div>
        <div className="twentypxmargin" />
        <Button variant="light" size="lg" onClick={toggleLanguage}>
          {i18n.language === "en" ? t("lang.SO") : t("lang.EN")}
        </Button>
      </center>
    </>
  );
};

export default Home;
