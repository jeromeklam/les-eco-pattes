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

  render() {
    return (
      <div>
        <CSSTransition in={this.props.common.sidebar} timeout={300} classNames="sidebar">
          <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">{process.env.REACT_APP_APP_NAME}</div>
            <div className="list-group list-group-flush">
              <NavLink exact className="nav-link" to="/">
                <HomeIcon/>
                Accueil
              </NavLink>
              <NavLink strict className="nav-link" to="/site">
                <SiteIcon/>
                Sites
              </NavLink>
              <NavLink strict className="nav-link" to="/cause">
                <CauseIcon/>
                Animaux
              </NavLink>
              <NavLink strict className="nav-link" to="/data">
                <DataIcon/>
                Données
              </NavLink>
              <NavLink strict className="nav-link" to="/site-type">
                <DataIcon/>
                Types de sites
              </NavLink>
              <NavLink strict className="nav-link" to="/cause-type">
                <DataIcon/>
                Types animaux
              </NavLink>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopSidebar));
