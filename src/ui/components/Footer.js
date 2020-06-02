import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("Footer");
  return (
    <footer className="footer">
      {t("builtBy")}&nbsp;
      <a href="https://flatten.ca/about-us" className="footerLink">
        Flatten
      </a>
    </footer>
  );
};

export default Footer;
