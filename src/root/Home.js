import React from "react";
import { useTranslation } from "react-i18next";
import { Routes } from "../config";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Home = () => {
  //let auth = useSelector((state) => state.auth); // use the auth state from the store
  //let followUp = useSelector((state) => state.followUp);
  const { t, i18n } = useTranslation();

  const toggleLanguage = (e) => {
    e.preventDefault();
    i18n.changeLanguage(i18n.language === "en" ? "so" : "en");
  };

  return (
    <>
      <center>
        <div className="seventypxmargin" />
        <div className="websitetitle">
          <b>{t("Home:welcome")}</b>
        </div>
        <div className="fourtypxmargin" />
        <div className="heading">{t("Home:formSelectionPrompt")}</div>
        <div className="twentypxmargin" />
        <Button variant="light" size="lg" href={Routes.submission}>
          {t("Home:goToInitialSurvey")}
        </Button>
        <Button variant="light" size="lg" href={null} disabled="true">
          {t("Home:goToGravediggerSurvey")}
        </Button>
        {/*TODO there should be a check for if there are follow ups and a notification will show*/}
        <Button variant="light" size="lg" href={null} disabled="true">
          {t("Home:goToFollowupSurvey")}
        </Button>
        {/* Don't know if theres a more secure/better way to do this auth.user.permissions.includes(
            "manageVolunteers"
          ) && <Link to={null}>{t("Home:goToAddVolunteer")}</Link> */}
        <div className="seventypxmargin" />
        <div className="heading">{t("Home:languageTogglePrompt")}</div>
        <div className="twentypxmargin" />
        <Button variant="light" size="lg" onClick={toggleLanguage}>
          {i18n.language === "en" ? t("Home:lang.SO") : t("Home:lang.EN")}
        </Button>
      </center>
    </>
  );
};

export default Home;
