import { connect } from "react-redux";
import { Form } from "react-formio";
import { push } from "connected-react-router";
import {AppConfig, AuthConfig, FormConfig} from "../../config";

const mapStateToProps = () => ({
    src: AppConfig.projectUrl + "/" + FormConfig.addVolunteerForm.formPath
});

const mapDispatchToProps = (dispatch) => ({
    onSubmitDone: (_) => {
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
