import { useTranslation } from "react-i18next";
import React from "react";

const TranslatedText = ({ component }) => {
  const { t } = useTranslation("FormIOCustomText");
  return <h4>{t(component.i18nKey)}</h4>;
};

export default TranslatedText;
