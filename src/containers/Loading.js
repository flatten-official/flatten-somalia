import React from "react";
import { useTranslation } from "react-i18next";

export default () => {
  let { t, i18n } = useTranslation();
  return (
    <div> {t('Loading:loading')} </div>
  );
}
