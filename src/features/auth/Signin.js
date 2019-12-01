import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import logo from '../../images/logo-les-eco-pattes.jpg';
import { InputEmailUpDown, InputPasswordUpDown } from '../layout';
import { getJsonApi, initAxios } from '../../common';
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authenticated) {
      nextProps.history.push('/');
    }
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
        type: 'FreeSSO_Signin',
        login: this.state.username,
        password: this.state.password,
        remember: false,
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
          <InputEmailUpDown
            id="username"
            name="username"
            label="Adresse email"
            required=""
            autoFocus=""
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
