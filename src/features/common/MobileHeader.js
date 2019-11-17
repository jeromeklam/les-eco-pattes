import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';
import LoginIcon from '../icons/Login';
import LogoutIcon from '../icons/Logout';

export class MobileHeader extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <header className="mobile-header w-100">
        <div className="row">
          <div className="col-8">
            EN-TETE PAGE MOBILE
          </div>
          <div className="col-4 text-right">
            {this.props.auth.authenticated 
              ? <Link className="nav-link" to="/auth/signout"><LogoutIcon /></Link>
              : <Link className="nav-link" to="/auth/signin"><LoginIcon/></Link>
            }
          </div>
        </div>
      </header>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
    auth: state.auth
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileHeader);
