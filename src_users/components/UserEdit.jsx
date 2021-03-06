import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Field, SubmissionError, reduxForm } from 'redux-form';
import { PageHeader, Form } from 'react-bootstrap';
import FormField from './common/FormField';
import FormSubmit from './common/FormSubmit';

// User add/edit page component
export class UserEdit extends Component {
  // constructor
  constructor(props) {
    super(props);

    // bind <this> to the event method
    this.formSubmit = this.formSubmit.bind(this);
  }

  // submit the form
  formSubmit(values) {
    const { dispatch } = this.props;
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'USERS_ADD_EDIT',
        user: {
          id: values.id || 0,
          username: values.username,
          job: values.job,
        },
        callbackError: (error) => {
          reject(new SubmissionError({ _error: error }));
        },
        callbackSuccess: () => {
          dispatch(push('/'));
          resolve();
        },
      });
    });
  }

  // render
  render() {
    const { user, handleSubmit, error, invalid, submitting } = this.props;
    return (
      <div className="page-user-edit">
        <PageHeader>{`User ${user.id ? 'edit' : 'add'}`}</PageHeader>
        <Form horizontal onSubmit={handleSubmit(this.formSubmit)}>
          <Field component={FormField} name="username" label="Username" doValidate />
          <Field component={FormField} name="job" label="Job" />
          <FormSubmit
            error={error}
            invalid={invalid}
            submitting={submitting}
            buttonSaveLoading="Saving..."
            buttonSave="Save User"
          />
        </Form>
      </div>
    );
  }
}

UserEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

UserEdit.defaultProps = {
  error: null,
  invalid: false,
  submitting: false,
};

// decorate the form component
const UserEditForm = reduxForm({
  form: 'user_edit',
  validate(values) {
    const errors = {};
    if (!values.username) {
      errors.username = 'Username is required';
    }
    return errors;
  },
})(UserEdit);

// export the connected class
function mapStateToProps(state, ownProps) {
  const user = state.users.find(x => Number(x.id) === Number(ownProps.params.id)) || {};
  return {
    user,
    initialValues: user,
  };
}
export default connect(mapStateToProps)(UserEditForm);
