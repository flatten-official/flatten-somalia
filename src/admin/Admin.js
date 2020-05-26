import React from "react";
import { useSelector } from "react-redux";
import { selectRoot } from "react-formio";
import { useTranslation } from "react-i18next";
import { permissions, hasPermission } from "../auth/authApi";
import AddVolunteer from "./AddVolunteer";

const Admin = () => {
  const auth = useSelector((state) => selectRoot("auth", state));
  const { t } = useTranslation();
  return (
    <>
      {hasPermission(auth, permissions.manageVolunteers) ? (
        <>
          <h2>{t("Admin:welcomeHeader")}</h2>
          <AddVolunteer />
          <br />
        </>
      ) : (
        <h3> {t("Auth:unauthorized")} </h3>
      )}
    </>
  );
};

export default Admin;
