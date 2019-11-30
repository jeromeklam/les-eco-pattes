import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class MobileMenu extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="common-mobile-menu">
        <NavLink strict className="nav-link" to="/data" onClick={this.props.onToggle}>
          Variables
        </NavLink>
        <NavLink strict className="nav-link" to="/site-type" onClick={this.props.onToggle}>
          Type de site
        </NavLink>
        <NavLink strict className="nav-link" to="/cause-type" onClick={this.props.onToggle}>
          Races d'animaux
        </NavLink>
        <NavLink strict className="nav-link" to="/cause-main-type" onClick={this.props.onToggle}>
          Espèces d'animaux
        </NavLink>
      </div>
    );
  }
}
