import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Types } from "./FormActions";
import { Location } from "../location/Location";
import Form from "./Form";
import FormDef from "./VolunteerForm.json";
import flattenApi from "../backend/api";
import backend from "../backend/backend";
import { push } from "connected-react-router";

function Consent() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onConsent = () => {
    dispatch({ type: Types.SET_CONSENT, payload: true });
    dispatch({ type: Types.SET_START_TIME, payload: Date.now() });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="seventypxmargin"></div>
          <center>
            <div className="body">{t("VolunteerForm:consent")}</div>
          </center>
        </Col>
      </Row>
      <Row>
        <Col>
          <center>
            <div className="buttons">
              <Button onClick={onConsent}>
                {t("VolunteerForm:givesConsent")}
              </Button>
            </div>{" "}
          </center>
        </Col>
      </Row>
    </Container>
  );
}

const SubmissionPageContent = () => {
  const formData = useSelector((state) => state.volunteerForm);
  const dispatch = useDispatch();

  useEffect(() => dispatch({ type: Types.RESTART_FORM }), [dispatch]);

  const onSubmit = async (data) => {
    const endTime = Date.now();
    const reformatted = {
      household: {},
      metedata: {
        startTime: formData.startTime,
        endTime: endTime,
        timeToComplete: endTime - formData.startTime,
        location: formData.location,
        consentGiven: formData.consent,
      },
      schema: {
        form: "volunteerInitialForm",
        version: "0.1",
      },
    };
    Object.entries(data).map(([k, v]) => {
      if (k === "personGrid") {
        reformatted.people = v;
      } else if (k === "deathGrid") {
        reformatted.deaths = v;
      } else {
        reformatted.household[k] = v;
      }
    });
    // need to actually add the submission in here!
    await backend.request({
      ...flattenApi.volunteerForm,
      data: reformatted,
    });
    dispatch(push("/success"));
  };

  if (!formData.consent) return <Consent />;

  if (!formData.location) return <Location />;

  return (
    <Form
      formioForm={FormDef}
      submitHook={onSubmit}
      formioOptions={{ noAlerts: false }}
    />
  );
};

const SubmissionPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h3> {t("VolunteerForm:title")} </h3>
      <SubmissionPageContent />
    </div>
  );
};

export default SubmissionPage;
