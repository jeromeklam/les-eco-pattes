import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { CSSTransition } from 'react-transition-group';
import HomeIcon from '../icons/Home';
import DataIcon from '../icons/Data';
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
      <div className="sidebar-wrapper sidebar-container bg-light border-right">
        <ul class="sidebar-navigation ">
          <li class="header">Navigation</li>
          <li>
            <NavLink exact className="nav-link" to="/">
              <HomeIcon />
              <span>Accueil</span>
            </NavLink>
          </li>
          <li>
            <NavLink strict className="nav-link" to="/site">
              <SiteIcon />
              <span>Sites</span>
            </NavLink>
          </li>
          <li>
            <NavLink strict className="nav-link" to="/cause">
              <CauseIcon />
              <span>Animaux</span>
            </NavLink>
          </li>
          <li class="header"><hr /></li>
          <li>
            <NavLink strict className="nav-link" to="/data">
              <span>Variables</span>
            </NavLink>
          </li>
          <li>
            <NavLink strict className="nav-link" to="/site-type">
              <span>Type de site</span>
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
        </ul>
        <br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesktopSidebar));
