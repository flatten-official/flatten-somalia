import React from "react";
import { useTranslation } from "react-i18next";
import { Surveys } from "../../config";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import { ExpireSoonModal } from "../components/Modal";

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
      <HomeSurveyButton survey={Surveys.initialBRA} />
      <HomeSurveyButton survey={Surveys.gravedigger} disabled={true} />
      <HomeSurveyButton survey={Surveys.hospital} disabled={true} />

      {/* Will display a modal forcing the user to logout if the expiry is soon */}
      <ExpireSoonModal minutes={70} />
    </>
  );
};

export default Home;
