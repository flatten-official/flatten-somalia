import React from "react";
import { useTranslation } from "react-i18next";

export default () => {
  let { t, i18n } = useTranslation();
  return (
    <h3>
      {t('Auth:submittedEmailMessage')}
    </h3>
  );
}