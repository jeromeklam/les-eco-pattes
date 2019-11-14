import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSignInAlt,
  faSignOutAlt
 } from '@fortawesome/free-solid-svg-icons'

export class MainHeader extends Component {
  static propTypes = {
    layout: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">{process.env.REACT_APP_APP_NAME}</a>
        {this.props.auth.authenticated 
          ? <input className="form-control form-control-dark w-100" type="text" placeholder="Rechercher" aria-label="Rechercher" />
          : <div className="w-100"></div>
        }
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="/">
              {this.props.auth.authenticated 
                ? <Link to="/auth/signout"><FontAwesomeIcon icon={faSignOutAlt} title="Logout"/></Link>
                : <Link to="/auth/signin"><FontAwesomeIcon icon={faSignInAlt} title="Login"/></Link>
              }
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    layout: state.layout,
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
)(MainHeader);
