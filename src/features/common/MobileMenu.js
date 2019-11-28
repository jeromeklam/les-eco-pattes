import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class MobileMenu extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="common-mobile-menu">
        <NavLink strict className="nav-link" to="/data" onClick={this.props.onToggle}>
          Divers
        </NavLink>
        <NavLink strict className="nav-link" to="/site-type" onClick={this.props.onToggle}>
          Type de site
        </NavLink>
        <NavLink strict className="nav-link" to="/cause-type" onClick={this.props.onToggle}>
          Type d'animaux
        </NavLink>
      </div>
    );
  }
}
