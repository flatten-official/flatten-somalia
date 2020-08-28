import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginSuccess from "./LoginSuccess";
import backend from "../../backend/api/backend";
import flattenApi from "../../backend/api/api";
import Form from "../components/surveys/formio/Form";
import LoginFormJson from "../../forms/Login.json";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

const DisconnectedModal = () => {
  const { t } = useTranslation("Login");

  const [accepted, setAccepted] = useState(false);
  const wasDisconnected = useSelector((state) => state.auth.wasDisconnected);

  return (
    <Modal
      show={wasDisconnected && !accepted}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>{t("disconnectedModal.header")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t("disconnectedModal.body")}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setAccepted(true)}>
          {t("disconnectedModal.ok")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Login = () => {
  const { t } = useTranslation("Login");
  const [didSubmit, setDidSubmit] = useState(false);

  if (didSubmit) return <LoginSuccess />;

  const onSubmit = async (data) => {
    await backend.request({ ...flattenApi.login, data: { email: data.email } });
    setDidSubmit(true);
  };

  return (
    <>
<<<<<<< HEAD:packages/frontend/src/ui/login/Login.js
=======
      <DisconnectedModal />
>>>>>>> 8097dac... Simplify auth and add modal code:src/ui/login/Login.js
      <div className="panel-heading card-header"> {t("loginForm.title")} </div>
      <div className="panel-body card-body">
        <Form formioForm={LoginFormJson} submitHook={onSubmit} />
      </div>
    </>
  );
};

export default Login;
