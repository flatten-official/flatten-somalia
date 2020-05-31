import React from "react";
import { useTranslation } from "react-i18next";
import { Routes } from "../config";
import { Link } from "react-router-dom";

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
        <div className="buttons">
          {/*followUp && <div className="alertText">Home:followUpsText</div> */}
          <Link to={Routes.submission}>{t("Home:goToSubmissionText")}</Link>
        </div>
        <div className="buttons">
          <Link to={null}>{t("Home:goToGraveDigger")}</Link>
        </div>
        <div className="buttons">
          {/*This is filler, TODO there should be a check for if there are follow ups and a notification will show*/}
          <Link to={null}>{t("Home:goToFollowUp")}</Link>
          {/* Don't know if theres a more secure/better way to do this auth.user.permissions.includes(
            "manageVolunteers"
          ) && <Link to={null}>{t("Home:goToAddVolunteer")}</Link> */}
        </div>
      </center>
    </>
  );
};

export default Home;
