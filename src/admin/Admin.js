import React from "react";
import { useSelector } from "react-redux";
import { selectRoot } from "react-formio";
import { AUTH_SUCCESS } from "../auth/authActions";
import { useTranslation } from "react-i18next";

const Admin = () => {
  const auth = useSelector((state) => selectRoot("auth", state));
  const { t } = useTranslation();
  return (
    <>
      {/* TODO - change this depending on what the eventual shape of the permissions object is. */}
      {auth.status === AUTH_SUCCESS &&
      auth.user.permissions.indexOf("admin") > -1 ? (
        <>
          <h2>{t("Admin:welcomeHeader")}</h2>
          <br />
        </>
      ) : (
        <h3> {t("Auth:unauthorized")} </h3>
      )}
    </>
  );
};

export default Admin;
