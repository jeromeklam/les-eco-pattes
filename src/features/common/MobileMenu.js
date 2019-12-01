import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { NavLink } from 'react-router-dom';

export class MobileMenu extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="common-mobile-menu">
        {this.props.auth.authenticated ? (
          <div>
            <NavLink strict className="nav-link" to="/data" onClick={this.props.onToggle}>
              Variables
            </NavLink>
            <NavLink strict className="nav-link" to="/site-type" onClick={this.props.onToggle}>
              Type de site
            </NavLink>
            <NavLink strict className="nav-link" to="/cause-type" onClick={this.props.onToggle}>
              Races d'animaux
            </NavLink>
            <NavLink
              strict
              className="nav-link"
              to="/cause-main-type"
              onClick={this.props.onToggle}
            >
              Espèces d'animaux
            </NavLink>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
