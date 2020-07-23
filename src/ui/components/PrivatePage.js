import { useTranslation } from "react-i18next";
import React from "react";
import { useSelector } from "react-redux";
import { hasPermission } from "../../backend/auth/authApi";

const PrivatePage = ({ requiredPermission, comp: Component }) => {
  const auth = useSelector((state) => state.auth);
  const { t } = useTranslation("General");

  if (hasPermission(auth, requiredPermission)) return <Component />;
  else
    return (
      <>
        <h2>{t("unauthorized")}</h2>
      </>
    );
};

export default PrivatePage;
