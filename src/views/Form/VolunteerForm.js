import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {selectRoot, resetSubmissions, saveSubmission, Form, selectError, Errors, getForm} from 'react-formio';
// import {push} from 'connected-react-router';
import Loading from '../../containers/Loading'

const formName = 'volunteerFormSomalia';

const VolunteerForm = class extends Component {
    componentWillMount() {
        this.props.getForm();
    }

    render() {

        const {
            submission,
            hideComponents,
            onSubmit,
            errors,
            options,
            form: {form, isActive, url}
        } = this.props;

        if (isActive) {
            return <Loading />;
        }

        return (
            <div>
                <h3>Somalia Volunteer Form</h3>
                <Errors errors={errors} />
                <Form 
                  form={form}
                  submission={submission}
                  url={url}
                  options={options}
                  hideComponents={hideComponents}
                  onSubmit={onSubmit}
                />
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        form: selectRoot('form', selectRoot(formName, state)),
        errors: [
            selectError('form', selectRoot(formName, state)),
            selectError('submission', selectRoot(formName, state)),
        ],
        options: {
            noAlerts: true
        },
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getForm: () => dispatch(getForm(formName)),
        onSubmit: (submission) => {
            dispatch(saveSubmission(formName, submission, null, (err, submission)=> {
                if(!err) {
                    dispatch(resetSubmissions(formName));
                }
            }))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VolunteerForm);