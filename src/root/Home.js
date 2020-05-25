import React from "react";
import { useTranslation } from "react-i18next";
import { Routes } from "../config";
import { Link } from "react-router-dom";

const Home = ({}) => {
  //let auth = useSelector((state) => state.auth); // use the auth state from the store
  //let followUp = useSelector((state) => state.followUp);
  const { t } = useTranslation();

  return (
    <>
      <div className="wordmark">
        <b>Welcome Volunteer!</b>
      </div>
      <div className="body">
        <div>Select the form you need:</div>
        {/*followUp && <div className="alertText">Home:followUpsText</div> */}
        <Link to={Routes.submission}>{t("Home:goToSubmissionText")}</Link>
        <br />
        <Link to={null}>{t("Home:goToGraveDigger")}</Link>
        <br />
        {/*This is filler, there should be a check for if there are follow ups and a notification will show*/}
        <Link to={null}>{t("Home:goToFollowUp")}</Link>
        <br />
        {/* Don't know if theres a more secure/better way todo this auth.user.permissions.includes(
            "manageVolunteers"
          ) && <Link to={null}>{t("Home:goToAddVolunteer")}</Link> */}
      </div>
    </>
  );
};

export default Home;
