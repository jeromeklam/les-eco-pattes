import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { InputText } from '../layout';

export class SimpleForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <form className="auth-simple-form">
        <div className="row">
          <div className="col-12"></div>
          <div className="col-12">
            <InputText label="Prénom" name="user_first_name" value={this.props.auth.user.user_first_name}/>
            <InputText label="Nom" name="user_last_name" value={this.props.auth.user.user_last_name}/>
          </div>
          <div className="col-12"></div>
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
