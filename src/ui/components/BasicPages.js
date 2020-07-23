import { useTranslation } from "react-i18next";
import React from "react";
import { useSelector } from "react-redux";
import { hasPermission } from "../../backend/auth/authApi";

const PageRestricted = () => {
  const { t } = useTranslation("General");

  return (
    <>
      <h2>{t("unauthorized")}</h2>
    </>
  );
};

const PrivatePage = ({ requiredPermission, comp: Component }) => {
  const auth = useSelector((state) => state.auth);

  if (hasPermission(auth, requiredPermission)) return <Component />;
  else return <PageRestricted />;
};

export { PageRestricted, PrivatePage };
