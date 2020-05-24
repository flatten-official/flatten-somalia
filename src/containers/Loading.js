import React from "react";
import { useTranslation } from "react-i18next";

const Loading = () => {
  let { t } = useTranslation();
  return <div> {t("Loading:loading")} </div>;
};

export default Loading;
