import React from "react";
import { Translate } from "react-redux-i18n";

const Footer =  () => (
    <footer className="footer">
        <div className="container text-center" style={{ padding: "15px" }}>
            <Translate value={'Footer.builtBy'}/> &nbsp;
            <a href="https://flatten.ca">Flatten.ca</a>&nbsp; |&nbsp;Forms powered by{" "}
            <a href="https://form.io">form.io</a>
        </div>
    </footer>
);

export default Footer;