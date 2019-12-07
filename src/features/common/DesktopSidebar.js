import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import AboutIcon from '../icons/About';
import LoginIcon from '../icons/Login';
import HomeIcon from '../icons/Home';
import SiteIcon from '../icons/Site';
import CauseIcon from '../icons/Cause';

export class DesktopSidebar extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      menuDataOpen: false,
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState({ menuDataOpen: !this.state.menuDataOpen });
  }

  render() {
    return (
      <div
        className={classnames(
          this.props.common.sidebar && 'sidebar-container-menu',
          'sidebar-wrapper sidebar-container bg-light border-right',
        )}
      >
        <ul className="sidebar-navigation ">
          <li className="header">Navigation</li>
          <li>
            <NavLink exact className="nav-link" to="/">
              <HomeIcon />
              <span>Accueil</span>
            </NavLink>
          </li>
          {this.props.auth.authenticated ? (
            <div>
              <li>
                <NavLink strict className="nav-link" to="/map">
                  <SiteIcon />
                  <span>Carte</span>
                </NavLink>
              </li>
              <li>
                <NavLink strict className="nav-link" to="/site">
                  <SiteIcon />
                  <span>Sites</span>
                </NavLink>
              </li>
              <li>
                <NavLink strict className="nav-link" to="/client">
                  <SiteIcon />
                  <span>Personnes</span>
                </NavLink>
              </li>
              <li>
                <NavLink strict className="nav-link" to="/cause">
                  <CauseIcon />
                  <span>Animaux</span>
                </NavLink>
              </li>
              <li className="header">
                <hr />
              </li>
              <li>
                <NavLink strict className="nav-link" to="/data">
                  <span>Variables</span>
                </NavLink>
              </li>
              <li>
                <NavLink strict className="nav-link" to="/client-type">
                  <span>Types de personne</span>
                </NavLink>
              </li>
              <li>
                <NavLink strict className="nav-link" to="/client-category">
                  <span>Catégories de personne</span>
                </NavLink>
              </li>
              <li>
                <NavLink strict className="nav-link" to="/site-type">
                  <span>Types de site</span>
                </NavLink>
              </li>
              <li>
                <NavLink strict className="nav-link" to="/cause-type">
                  <span>Races d'animaux</span>
                </NavLink>
              </li>
              <li>
                <NavLink strict className="nav-link" to="/cause-main-type">
                  <span>Espèces d'animaux</span>
                </NavLink>
              </li>
              <li className="header">
                <hr />
              </li>
              <li>
                <NavLink strict className="nav-link" to="/email">
                  <span>Emails</span>
                </NavLink>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <NavLink strict className="nav-link" to="/auth/signin">
                  <LoginIcon />
                  <span>Login</span>
                </NavLink>
              </li>
              <li className="header">
                <hr />
              </li>
              <li>
                <NavLink strict className="nav-link" to="/about">
                  <AboutIcon />
                  <span>A propos de...</span>
                </NavLink>
              </li>
            </div>
          )}
        </ul>
        <br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesktopSidebar));
