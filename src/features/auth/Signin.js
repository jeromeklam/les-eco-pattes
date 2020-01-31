import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import logo from '../../images/logo-les-eco-pattes.jpg';
import { InputEmail, InputPassword, InputCheckbox } from 'freeassofront';
import { getJsonApi, getFieldErrorMessage } from 'freejsonapi';
import { withRouter } from 'react-router-dom';
import { Copyright } from '../common';

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
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.authenticated) {
      this.props.history.push('/');
    }
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

  render() {
    return (
      <div className="auth-signin">
        <form className="form-signin text-center" onSubmit={this.onSubmit}>
          <img className="mb-4" src={logo} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">Identification</h1>
          <InputEmail
            id="username"
            name="username"
            label="Adresse email"
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
            label="Mot de passe"
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
              detail="Se souvenir de moi"
              onChange={this.onChange}
            />
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Connexion
          </button>
          <Copyright />
        </form>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
