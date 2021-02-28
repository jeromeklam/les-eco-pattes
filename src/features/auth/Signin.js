import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { InputEmail, InputCheckbox, Highlight, HighlightButton } from 'react-bootstrap-front';
import { getJsonApi } from 'jsonapi-front';
import * as actions from './redux/actions';
import { Copyright, showErrors, getFieldErrorMessage, InputPassword } from '../ui';
import logo from '../../images/logo-les-eco-pattes.jpg';

export class Signin extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      remember: false,
      username: '',
      username_error: null,
      password: '',
      password_error: null,
      passwordAsk: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onForgotPasswordAsk = this.onForgotPasswordAsk.bind(this);
    this.onForgotPasswordClose = this.onForgotPasswordClose.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.authenticated) {
      this.props.history.push('/');
    }
  }

  onForgotPasswordAsk(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this.setState({ passwordAsk: true });
  }

  onForgotPasswordClose(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this.setState({ passwordAsk: false });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.auth.authenticated) {
      props.history.push('/');
    } else {
      if (props.auth.signInError) {
        return {
          username_error: getFieldErrorMessage(props.intl, props.auth.signInError, 'login'),
          password_error: getFieldErrorMessage(props.intl, props.auth.signInError, 'password'),
        };
      }
    }
    return null;
  }

  onChange(event) {
    if (event && event.persist) {
      event.persist();
    }
    if (event && event.target) {
      switch (event.target.type) {
        case 'checkbox':
          const valcheck = event.target.checked || false;
          this.setState({ [event.target.name]: valcheck });
          break;
        default:
          const value = event.target.value;
          this.setState({ [event.target.name]: value });
          break;
      }
    }
  }

  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    let username_error = '';
    let password_error = '';
    let error = false;
    this.setState({ username_error: username_error, password_error: password_error });
    if (!error) {
      const datas = {
        type: 'FreeSSO_Signin',
        login: this.state.username,
        password: this.state.password,
        remember: this.state.remember,
      };
      let obj = getJsonApi(datas);
      this.props.actions
        .signIn(obj)
        .then(result => {
          this.props.history.push('/');
        })
        .catch(errors => {
          showErrors(this.props.intl, errors, 'signIn');
        });
    }
  }

  onSubmitPassword(event) {
    if (event) {
      event.preventDefault();
    }
    let username_error = '';
    let error = false;
    this.setState({ username_error: username_error });
    if (!error) {
      const datas = {
        type: 'FreeSSO_AskPassword',
        login: this.state.username,
      };
      let obj = getJsonApi(datas);
      this.props.actions
        .askPassword(obj)
        .then(result => {
          this.setState({ username_error: username_error, passwordAsk: false });
        })
        .catch(errors => {
          showErrors(this.props.intl, errors, 'askPassword');
        });
    }
  }

  render() {
    const { intl } = this.props;
    return (
      <div className="auth-signin">
        {this.state.passwordAsk ? (
          <form className="form-signin text-center" onSubmit={this.onSubmitPassword}>
            <img className="mb-4" src={logo} alt=""  height="72" />
            <h1 className="h3 mb-3 font-weight-normal">
              <FormattedMessage
                id="app.features.auth.login.lostPassword"
                defaultMessage="Lost password"
              />
            </h1>
            <div className="card">
              <div className="card-body text-left">
                <InputEmail
                  id="username"
                  name="username"
                  label={
                    <FormattedMessage
                      id="app.features.auth.login.username"
                      defaultMessage="Connexion"
                    />
                  }
                  placeholder={intl.formatMessage({
                    id: 'app.features.auth.login.username',
                    defaultMessage: 'Email address',
                  })}
                  required=""
                  autoFocus=""
                  labelInline
                  value={this.state.username}
                  error={this.state.username_error}
                  onChange={this.onChange}
                />
                <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">
                  <FormattedMessage
                    id="app.features.auth.login.askPassword"
                    defaultMessage="Send password reset email"
                  />
                </button>
                <button
                  className="btn btn-lg btn-secondary btn-block mb-2"
                  type="button"
                  onClick={this.onForgotPasswordClose}
                >
                  <FormattedMessage id="app.features.auth.login.back" defaultMessage="Back" />
                </button>
              </div>
            </div>
            <Copyright className="bg-white" />
          </form>
        ) : (
          <form className="form-signin text-center" onSubmit={this.onSubmit}>
            <img className="mb-4" src={logo} alt="" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">
              <FormattedMessage id="app.features.auth.login.title" defaultMessage="Login" />
            </h1>
            <div className="card">
              <div className="highlight-toggler">
                <HighlightButton theme="SIGNIN" />
              </div>
              <div className="card-body text-left">
                <Highlight
                  title={intl.formatMessage({
                    id: 'app.features.auth.login.help.username',
                    defaultMessage: 'Your email address for login',
                  })}
                  position="bottom"
                  theme="SIGNIN"
                >
                  <InputEmail
                    id="username"
                    name="username"
                    label={
                      <FormattedMessage
                        id="app.features.auth.login.username"
                        defaultMessage="Connexion"
                      />
                    }
                    placeholder={intl.formatMessage({
                      id: 'app.features.auth.login.username',
                      defaultMessage: 'Email address',
                    })}
                    required=""
                    autoFocus=""
                    labelInline
                    value={this.state.username}
                    error={this.state.username_error}
                    onChange={this.onChange}
                  />
                </Highlight>
                <Highlight
                  title={intl.formatMessage({
                    id: 'app.features.auth.login.help.password',
                    defaultMessage: 'Your password',
                  })}
                  position="bottom"
                  theme="SIGNIN"
                >
                  <InputPassword
                    id="password"
                    name="password"
                    label={
                      <FormattedMessage
                        id="app.features.auth.login.password"
                        defaultMessage="Connexion"
                      />
                    }
                    placeholder={intl.formatMessage({
                      id: 'app.features.auth.login.password',
                      defaultMessage: 'Password',
                    })}
                    required=""
                    labelInline
                    security={false}
                    value={this.state.password}
                    error={this.state.password_error}
                    onChange={this.onChange}
                  />
                </Highlight>
                <Highlight
                  title={intl.formatMessage({
                    id: 'app.features.auth.login.help.remember',
                    defaultMessage: 'Check to remember connexion (use cookies)',
                  })}
                  position="bottom"
                  theme="SIGNIN"
                >
                  <div className="checkbox mb-3 mt-2">
                    <InputCheckbox
                      name="remember"
                      checked={this.state.remember}
                      detail={
                        <FormattedMessage
                          id="app.features.auth.login.rememberMe"
                          defaultMessage="Connexion"
                        />
                      }
                      onChange={this.onChange}
                    />
                  </div>
                </Highlight>
                <Highlight
                  title={intl.formatMessage({
                    id: 'app.features.auth.login.help.connexion',
                    defaultMessage: 'Forgot password',
                  })}
                  position="bottom"
                  theme="SIGNIN"
                >
                  <button className="btn btn-lg btn-primary btn-block" type="submit">
                    <FormattedMessage
                      id="app.features.auth.login.connexion"
                      defaultMessage="Connexion"
                    />
                  </button>
                </Highlight>
                <hr />
                <div className="text-center">
                  <Highlight
                    title={intl.formatMessage({
                      id: 'app.features.auth.login.help.forgotPassword',
                      defaultMessage: 'Forgot password',
                    })}
                    position="bottom"
                    theme="SIGNIN"
                  >
                    <a href={null} onClick={this.onForgotPasswordAsk}>
                      <span>
                        <FormattedMessage
                          id="app.features.auth.login.forgotPassword"
                          defaultMessage="Forgot password ?"
                        />
                      </span>
                    </a>
                  </Highlight>
                </div>
              </div>
            </div>
            <Copyright className="bg-white" />
          </form>
        )}
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

export default withRouter(
  injectIntl(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(Signin),
  ),
);
