import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Surveys } from "../../../config";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import { checkSessionExpiry } from "../../auth/actions";
import { Permissions } from "../../../api/constants";

const HomeButton = ({ route, text, ...options }) => {
  const dispatch = useDispatch();

  return (
    <Button
      variant="light"
      size="lg"
      onClick={() => dispatch(push(route))}
      {...options}
    >
      {text}
    </Button>
  );
};

HomeButton.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string,
};

const HomeSurveyButton = ({ survey, ...options }) => {
  const { t } = useTranslation("Surveys");

  return (
    <HomeButton
      route={survey.route}
      text={t(survey.i18nTitleKey)}
      {...options}
    />
  );
};

HomeSurveyButton.propTypes = {
  survey: PropTypes.object,
};

const Home = () => {
  const { t } = useTranslation("Home");
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const showAddVolunteers = useSelector(
    (state) =>
      state.auth.user.permissions.indexOf(Permissions.manageVolunteers) > -1
  );

  // On every render of the home page check the session expiry
  useEffect(() => {
    dispatch(checkSessionExpiry(70));
  });

  return (
    <>
      <h3 className="homePageTitle">
        <b>{t("welcome")}</b>
      </h3>
      <h5 className="homePageSubheadingsBlue">{t("nameMessageTitle")}</h5>
      <h5 className="homePageSubheadings">
        {t("nameMessageResponse", { name: authUser.name })}
      </h5>
      <br />
      <h5 className="homePageSubheadingsBlue">{t("teamNameMessageTitle")}</h5>
      <h5 className="homePageSubheadings">
        {t("teamNameMessageResponse", { teamName: authUser.teamName })}
      </h5>
      <br />
      <h5 className="homePageSelectFormTitle">{t("formSelectionPrompt")}</h5>
      <HomeSurveyButton survey={Surveys.initialHousehold} />
      <HomeSurveyButton survey={Surveys.gravedigger} disabled={true} />
      <HomeSurveyButton survey={Surveys.hospital} disabled={true} />

      {showAddVolunteers && (
        <HomeButton route={Routes.addVolunteer} text={"Add Volunteers"} />
      )}
      {showAddVolunteers && (
        <HomeButton
          route={Routes.admin}
          text="Administrate Volunteers" /* TODO use translation */
        />
      )}
    </>
  );
};

export default Home;
