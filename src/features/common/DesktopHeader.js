import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link, NavLink, withRouter } from 'react-router-dom';
import MenuIcon from '../icons/Menu';
import LoginIcon from '../icons/Login';
import LogoutIcon from '../icons/Logout';
import { Account as AccountIcon } from '../icons';
import { SimpleForm } from '../auth';

export class DesktopHeader extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(event) {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    return (
      <div
        className={classnames(
          'common-desktop-header',
          this.state.menuOpen && 'common-desktop-header-open',
        )}
      >
        <SimpleForm />
        <nav
          className={classnames(
            this.props.common.sidebar && 'common-desktop-header-menu',
            'navbar navbar-expand-lg navbar-light bg-light border-bottom',
          )}
        >
          <button
            className="btn btn-primary"
            onClick={this.props.actions.toggleSidebar}
            id="menu-toggle"
          >
            <MenuIcon />
          </button>
          &nbsp;&nbsp;
          <div className="navbar-brand">Les Eco Pattes</div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink exact className="nav-link" to="/">
                  Accueil <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              {this.props.auth.authenticated && (
                <li className="nav-item">
                  <button className="nav-link" onClick={this.onToggle}>
                    <AccountIcon />
                    {this.props.auth.user.user_first_name}
                  </button>
                </li>
              )}
              <li className="nav-item">
                {this.props.auth.authenticated ? (
                  <Link className="nav-link" to="/auth/signout">
                    <LogoutIcon />
                    Déconnexion
                  </Link>
                ) : (
                  <Link className="nav-link" to="/auth/signin">
                    <LoginIcon />
                    Connexion
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesktopHeader));
