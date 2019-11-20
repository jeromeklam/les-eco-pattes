import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import logo from '../../images/logo-les-eco-pattes.jpg';
import { InputEmailUpDown, InputPasswordUpDown } from '../layout';
import { getJsonApi } from '../../common';

export class Signin extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      username_error: false,
      password: '',
      password_error: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    if (event) {
      event.preventDefault();
    }
    if (event && event.target) {
      const value = event.target.value;
      this.setState({ [event.target.name]: value });
    }
  }

  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    let username_error = false;
    let password_error = false;
    let error = false;
    if (this.state.username == '') {
      username_error = "L'email est obligatoire";
    }
    if (this.state.password == '') {
      password_error = 'Le mot de passe est obligatoire';
    }
    this.setState({ username_error: username_error, password_error: password_error });
    if (!error) {
      const datas = {
        login: this.state.username,
        password: this.state.password
      };
      let obj = getJsonApi(datas, 'FreeSSO_LoginRequest', 0);
      this.props.actions.signIn(obj);
    }
  }

  render() {
    return (
      <div className="auth-signin">
        <form className="form-signin text-center" onSubmit={this.onSubmit}>
          <img className="mb-4" src={logo} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">Identification</h1>
          <InputEmailUpDown
            id="username"
            name="username"
            label="Adresse email"
            required=""
            autofocus=""
            value={this.state.username}
            error={this.state.username_error}
            onChange={this.onChange}
          />
          <InputPasswordUpDown
            id="password"
            name="password"
            label="Mot de passe"
            required=""
            value={this.state.password}
            error={this.state.password_error}
            onChange={this.onChange}
          />
          <div className="checkbox mb-3 mt-2">
            <label>
              <input type="checkbox" value="remember-me" /> Se souvenir de moi
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Connexion
          </button>
          <p className="mt-5 mb-3 text-muted">©FreeAsso 2018-2019</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
