import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import logo from '../../images/logo-les-eco-pattes.jpg';
import { InputPassword } from 'freeassofront';
import { getJsonApi, queryStringToObject } from 'freejsonapi';
import { withRouter } from 'react-router-dom';
import { Copyright, messageSuccess, showErrors } from '../ui';

export class AskPassword extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const params = queryStringToObject(props.location.search);
    this.state = {
      token: params.token || '',
      password: '',
      password_error: null,
      password2: '',
      password2_error: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    if (event && event.persist) {
      event.persist();
    }
    if (event && event.target) {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  onSubmit(evt) {
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
        token: this.state.token,
      };
      let obj = getJsonApi(datas);
      this.props.actions
        .changePassword(obj)
        .then(result => {
          messageSuccess(
            intl.formatMessage({
              id: 'app.features.auth.askPassword.changed',
              defaultMessage: 'Password changed !',
            }),
          );
          this.props.history.push('/');
        })
        .catch(errors => {
          // @todo display errors to fields
          const { intl } = this.props;
          showErrors(intl, this.props.auth.changePasswordError);
        });
    }
  }

  render() {
    const { intl } = this.props;
    return (
      <div className="auth-ask-password">
        <form className="form-ask-password text-center" onSubmit={this.onSubmit}>
          <img className="mb-4" src={logo} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">
            <FormattedMessage
              id="app.features.auth.askPassword.changePassword"
              defaultMessage="Change password"
            />
          </h1>
          <div className="card">
            <div className="card-body text-left">
              <InputPassword
                id="password"
                name="password"
                label={
                  <FormattedMessage
                    id="app.features.auth.askPassword.password"
                    defaultMessage="Password"
                  />
                }
                placeholder={intl.formatMessage({
                  id: 'app.features.auth.askPassword.password',
                  defaultMessage: 'Password',
                })}
                required
                labelInline
                value={this.state.password}
                error={this.state.password_error}
                onChange={this.onChange}
              />
              <InputPassword
                id="password2"
                name="password2"
                label={
                  <FormattedMessage
                    id="app.features.auth.askPassword.password2"
                    defaultMessage="Confirm"
                  />
                }
                placeholder={intl.formatMessage({
                  id: 'app.features.auth.askPassword.password2',
                  defaultMessage: 'Confirm',
                })}
                required
                labelInline
                value={this.state.password2}
                error={this.state.password2_error}
                onChange={this.onChange}
              />
              <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">
                <FormattedMessage
                  id="app.features.auth.askPassword.send"
                  defaultMessage="Change password"
                />
              </button>
              <button
                className="btn btn-lg btn-secondary btn-block mb-2"
                type="button"
                onClick={this.onForgotPasswordClose}
              >
                <FormattedMessage id="app.features.auth.askPassword.back" defaultMessage="Back" />
              </button>
            </div>
          </div>
          <Copyright />
        </form>
      </div>
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(AskPassword)));
