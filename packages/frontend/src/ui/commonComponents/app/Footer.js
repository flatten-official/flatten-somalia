import React from "react";
import { useTranslation } from "react-i18next";

let branchName;

try {
  // noinspection JSFileReferences
  branchName = require("../../../../../../branch.json").name;
  // eslint-disable-next-line no-empty
} catch (e) {}

const Footer = () => {
  const { t } = useTranslation("Footer");
  return (
    <footer className="footer">
      {t("builtBy")}&nbsp;
      <a href="https://flatten.ca/about-us" className="footerLink">
        Flatten
      </a>
      {" | "}
      <a href="mailto:flattenofficial@gmail.com" className="footerLink">
        {t("sendFeedback")}
      </a>
      {branchName ? ` | Branch: ${branchName}` : ""}
    </footer>
  );
};

export default Footer;
