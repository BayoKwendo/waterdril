import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import AlternateEmailIcon from 'mdi-react/AlternateEmailIcon';
import { Alert, Button } from 'reactstrap';

const ResetPasswordForm = ({
  handleSubmit, errorMessage, errorMsg, fieldUser,
}) => (
  <Form className="form reset-password-form" onSubmit={handleSubmit}>
    <Alert
      color="danger"
      isOpen={!!errorMessage || !!errorMsg}
    >
      {errorMessage}
      {errorMsg}
    </Alert>
    <div className="form__form-group">
      <div>
        <span className="form__form-group-label">{fieldUser}</span>
      </div>
      <div className="form__form-group-field">
        <div className="form__form-group-icon">
          <AlternateEmailIcon />
        </div>
        <Field
          name="email"
          id="email"
          component="input"
          type="email"
          placeholder="example@mail.com"
          className="input-without-border-radius"
        />
      </div>
    </div>
    <Button className="account__btn" color="primary">
      Reset Password
    </Button>
  </Form>
);

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.shape(),
  errorMsg: PropTypes.shape(),
  fieldUser: PropTypes.shape(),
};

ResetPasswordForm.defaultProps = {
  errorMessage: null,
  errorMsg: null,
  fieldUser: null,
};

export default connect(state => ({
  errorMsg: state.user.error,
}))(reduxForm()(ResetPasswordForm));
