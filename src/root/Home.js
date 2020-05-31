import React from "react";
import { useTranslation } from "react-i18next";
import { Routes } from "../config";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Home = () => {
  //let auth = useSelector((state) => state.auth); // use the auth state from the store
  //let followUp = useSelector((state) => state.followUp);
  const { t } = useTranslation();

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
        <Button variant="light" size="lg" href={null}>
          {t("Home:goToGravediggerSurvey")}
        </Button>
        {/*TODO there should be a check for if there are follow ups and a notification will show*/}
        <Button variant="light" size="lg" href={null}>
          {t("Home:goToFollowupSurvey")}
        </Button>
        {/* Don't know if theres a more secure/better way to do this auth.user.permissions.includes(
            "manageVolunteers"
          ) && <Link to={null}>{t("Home:goToAddVolunteer")}</Link> */}
      </center>
    </>
  );
};

export default Home;
