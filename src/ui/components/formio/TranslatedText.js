import { useTranslation } from "react-i18next";
import React from "react";
import PropTypes from "prop-types";

const TranslatedText = ({ component }) => {
  const { t } = useTranslation("FormIOCustomText");
  return <h4>{t(component.i18nKey)}</h4>;
};

TranslatedText.propTypes = {
  component: PropTypes.object,
};

export default TranslatedText;
