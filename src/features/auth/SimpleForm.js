import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { InputText, InputPassword } from 'freeassofront';
import Avatar from 'react-avatar';

export class SimpleForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state= {
      password: '',
      confirm_password: '',
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({[event.target.name] : event.target.value});
  }

  render() {
    return (
      <form className="auth-simple-form pt-3" style={this.props.style}>
        <div className="row">
          <div className="col-6 text-center">
            <Avatar
              className="rounded-circle"
              email={this.props.auth.user.user_email}
              name={
                this.props.auth.user.user_first_name + ' ' + this.props.auth.user.user_last_name
              }
              size="150"
            />
          </div>
          <div className="col-15">
            <p>Mes informations :</p>
            <InputText
              label="Prénom"
              name="user_first_name"
              disabled={true}
              value={this.props.auth.user.user_first_name}
              size={{ desktop: [12, 24] }}
            />
            <InputText
              label="Nom"
              name="user_last_name"
              disabled={true}
              value={this.props.auth.user.user_last_name}
              size={{ desktop: [12, 24] }}
            />
            <InputText
              label="Email"
              name="user_last_name"
              disabled={true}
              value={this.props.auth.user.user_email}
              size={{ desktop: [12, 24] }}
            />
          </div>
          <div className="col-15">
            <p>Changer le mot de passe :</p>
            <InputPassword
              label="Mot de passe"
              name="password"
              value={this.state.password}
              size={{ desktop: [12, 24] }}
              onChange={this.onChange}
            />
            <InputPassword
              label="Confirmation"
              name="confirm_password"
              value={this.state.confirm_password}
              size={{ desktop: [12, 24] }}
              onChange={this.onChange}
            />
            <div className="text-right">
              <button type="button" className="btn btn-success btn-submit">
                <span>Modifier</span>
              </button>
            </div>
          </div>
        </div>
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(SimpleForm);
