import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import * as actions from './redux/actions';
import { getJsonApi } from 'jsonapi-front';
import { propagateModel } from '../../common';
import {
  messageSuccess,
  showErrors,
  getFieldError,
  InputPassword,
} from '../ui';

export class PasswordTab extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      old_password: '',
      password: '',
      password_error: null,
      password2: '',
      password2_error: null,
    };
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
  }

  onChangePassword(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmitPassword(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this.setState({ password_error: null, password2_error: null });
    const { intl } = this.props;
    let next = true;
    if (this.state.password === '') {
      const message1 = intl.formatMessage({
        id: 'app.features.auth.askPassword.error.emptyPassword',
        defaultMessage: 'Password is mandatory !',
      });
      this.setState({ password_error: message1 });
      next = false;
    }
    if (this.state.password2 === '') {
      const message2 = intl.formatMessage({
        id: 'app.features.auth.askPassword.error.emptyPassword2',
        defaultMessage: 'Password is mandatory !',
      });
      this.setState({ password2_error: message2 });
      next = false;
    }
    if (
      this.state.password !== '' &&
      this.state.password2 !== '' &&
      this.state.password !== this.state.password2
    ) {
      const message3 = intl.formatMessage({
        id: 'app.features.auth.askPassword.error.passwordDifferent',
        defaultMessage: 'Password is mandatory !',
      });
      this.setState({ password2_error: message3 });
      next = false;
    }
    if (next) {
      const datas = {
        type: 'FreeSSO_ChangePassword',
        password: this.state.password,
        password2: this.state.old_password,
      };
      let obj = getJsonApi(datas);
      this.props.actions
        .updatePassword(obj)
        .then(result => {
          this.setState({
            old_password: '',
            password: '',
            password2: '',
            password_error: null,
            password2_error: null,
          });
          messageSuccess(
            intl.formatMessage({
              id: 'app.features.auth.askPassword.changed',
              defaultMessage: 'Password changed !',
            }),
          );
          this.props.onChangeTab();
          this.props.onClose && this.props.onClose();
        })
        .catch(errors => {
          const { intl } = this.props;
          showErrors(intl, errors, 'updatePasswordError');
        });
    }
    return next;
  }

  render() {
    return (
      <form className="auth-simple-form" style={this.props.style} onSubmit={this.onSubmitPassword}>
        <InputPassword
          label={
            <FormattedMessage
              id="app.features.auth.form.oldPassword"
              defaultMessage="Old password"
            />
          }
          name="old_password"
          value={this.state.old_password}
          labelTop
          required
          error={getFieldError(
            this.props.intl,
            'old_password',
            this.props.auth.updatePasswordError,
          )}
          onChange={this.onChangePassword}
        />
        <InputPassword
          label={
            <FormattedMessage id="app.features.auth.form.password" defaultMessage="Password" />
          }
          name="password"
          value={this.state.password}
          labelTop
          required
          error={this.state.password_error}
          onChange={this.onChangePassword}
        />
        <InputPassword
          label={
            <FormattedMessage
              id="app.features.auth.form.password2"
              defaultMessage="Confirm password"
            />
          }
          name="password2"
          value={this.state.password2}
          labelTop
          required
          error={this.state.password2_error}
          onChange={this.onChangePassword}
        />
        <div className="text-right">
          <button type="submit" className="btn btn-success btn-submit">
            <span>
              {<FormattedMessage id="app.features.auth.form.save" defaultMessage="Save" />}
            </span>
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PasswordTab));
