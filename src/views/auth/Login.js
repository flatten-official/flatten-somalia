import { connect } from "react-redux";
import { Form } from "react-formio";
import { push } from "connected-react-router";
import { AppConfig, AuthConfig } from "../../config";

const mapStateToProps = () => ({
  src: AppConfig.projectUrl + "/" + AuthConfig.login.form,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitDone: (_) => {
    dispatch(push("/submitted-email"));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
