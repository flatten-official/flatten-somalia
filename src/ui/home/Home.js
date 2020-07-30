import React from "react";
import { useTranslation } from "react-i18next";
import { Surveys } from "../../config";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { checkWillExpireSoon } from "../../backend/auth/authApi";
import { logout } from "../../backend/auth/authActions";

const ExpireModal = () => {
  const { t } = useTranslation("Navbar");

  // TODO this will calculate expiry on each state update, this is not ideal and may also miss the expiry modal.
  const show = useSelector((state) => checkWillExpireSoon(state.auth));
  const dispatch = useDispatch();

  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>{t("expire.header")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t("expire.body")}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => dispatch(logout())}>
          {t("expire.ok")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

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
      <HomeSurveyButton survey={Surveys.gravedigger} disabled={true} />
      <HomeSurveyButton survey={Surveys.hospital} disabled={true} />
      <ExpireModal />
    </>
  );
};

export default Home;
