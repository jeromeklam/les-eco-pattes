import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import logo from '../../images/logo-les-eco-pattes.jpg';
import { InputEmail, InputPassword, InputCheckbox, Highlight } from 'freeassofront';
import { getJsonApi, getFieldErrorMessage } from 'freejsonapi';
import { withRouter } from 'react-router-dom';
import { Copyright, messageError } from '../ui';

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
          username_error: getFieldErrorMessage(props.auth.signInError, 'login'),
          password_error: getFieldErrorMessage(props.auth.signInError, 'password'),
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
      this.props.actions.signIn(obj).then(result => {
        this.props.history.push('/');
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
      this.props.actions.askPassword(obj).then(result => {
        this.setState({ username_error: username_error, passwordAsk: false });
      })
      .catch(errors => {
        // @todo display errors to fields
        const { intl } = this.props;
        messageError(intl.formatMessage({ id: 'app.features.auth.login.error.askPassword', defaultMessage: 'Error in request !'}));
      });
    }
  }

  render() {
    const { intl } = this.props;
    return (
      <div className="auth-signin">
        {this.state.passwordAsk ? (
          <form className="form-signin text-center" onSubmit={this.onSubmitPassword}>
            <img className="mb-4" src={logo} alt="" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">
              <FormattedMessage id="app.features.auth.login.lostPassword" defaultMessage="Lost password" />
            </h1>
            <div className="card">
              <div className="card-body text-left">
                <InputEmail
                  id="username"
                  name="username"
                  label={<FormattedMessage id="app.features.auth.login.username" defaultMessage="Connexion" />}
                  placeholder={intl.formatMessage({ id: 'app.features.auth.login.username', defaultMessage: 'Email address' })}
                  required=""
                  autoFocus=""
                  labelInline
                  value={this.state.username}
                  error={this.state.username_error}
                  onChange={this.onChange}
                />
                <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">
                  <FormattedMessage id="app.features.auth.login.askPassword" defaultMessage="Send password reset email" />
                </button>
                <button className="btn btn-lg btn-secondary btn-block mb-2" type="button" onClick={this.onForgotPasswordClose}>
                  <FormattedMessage id="app.features.auth.login.back" defaultMessage="Back" />
                </button>
              </div>
            </div>
            <Copyright />
          </form>
        ) : (
          <form className="form-signin text-center" onSubmit={this.onSubmit}>
            <img className="mb-4" src={logo} alt="" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">
              <FormattedMessage id="app.features.auth.login.title" defaultMessage="Login" />
            </h1>
            <div className="card">
              <div className="card-body text-left">
                <InputEmail
                  id="username"
                  name="username"
                  label={<FormattedMessage id="app.features.auth.login.username" defaultMessage="Connexion" />}
                  placeholder={intl.formatMessage({ id: 'app.features.auth.login.username', defaultMessage: 'Email address' })}
                  required=""
                  autoFocus=""
                  labelInline
                  value={this.state.username}
                  error={this.state.username_error}
                  onChange={this.onChange}
                />
                <InputPassword
                  id="password"
                  name="password"
                  label={<FormattedMessage id="app.features.auth.login.password" defaultMessage="Connexion" />}
                  placeholder={intl.formatMessage({ id: 'app.features.auth.login.password', defaultMessage: 'Password' })}
                  required=""
                  labelInline
                  value={this.state.password}
                  error={this.state.password_error}
                  onChange={this.onChange}
                />
                <div className="checkbox mb-3 mt-2">
                  <InputCheckbox
                    name="remember"
                    checked={this.state.remember}
                    detail={<FormattedMessage id="app.features.auth.login.rememberMe" defaultMessage="Connexion" />}
                    onChange={this.onChange}
                  />
                </div>
                <Highlight title={intl.formatMessage({ id: 'app.features.auth.login.help.connexion', defaultMessage: 'Forgot password' })} position="bottom">
                  <button className="btn btn-lg btn-primary btn-block" type="submit">
                    <FormattedMessage id="app.features.auth.login.connexion" defaultMessage="Connexion" />
                  </button>
                </Highlight>
                <hr />
                <div className="text-center">
                  <Highlight title={intl.formatMessage({ id: 'app.features.auth.login.help.forgotPassword', defaultMessage: 'Forgot password' })} position="bottom">
                    <a href={null} onClick={this.onForgotPasswordAsk}>
                      <span>
                        <FormattedMessage id="app.features.auth.login.forgotPassword" defaultMessage="Forgot password ?" />
                      </span>
                    </a>
                  </Highlight>
                </div>
              </div>
            </div>
            <Copyright />
          </form>
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(Signin)));
