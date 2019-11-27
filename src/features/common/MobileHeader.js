import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';
import LoginIcon from '../icons/Login';
import LogoutIcon from '../icons/Logout';
import AccountIcon from '../icons/Account';

export class MobileHeader extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <header className="mobile-header w-100">
        <div className="row">
          <div className="col-20">
            <span className="header-title">{process.env.REACT_APP_APP_NAME}</span>
          </div>
          <div className="col-16 text-right">
            {this.props.auth.authenticated ? (
              <ul class="nav justify-content-end">
                <li class="nav-item">
                  <Link className="nav-link" to="/auth/account">
                    <AccountIcon color="white"/>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link className="nav-link" to="/auth/signout">
                    <LogoutIcon color="white"/>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul class="nav justify-content-end">
                <li class="nav-item">
                  <Link className="nav-link" to="/auth/signin">
                    <LoginIcon color="white"/>
                  </Link>
                </li>
              </ul>
            )}
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
    auth: state.auth,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileHeader);
