import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarkedAlt,
  faHome
 } from '@fortawesome/free-solid-svg-icons'

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
              <Link className="nav-link" to="/"><FontAwesomeIcon icon={faHome} title="Accueil"/> Accueil</Link>
              <Link className="nav-link" to="/site"><FontAwesomeIcon icon={faMapMarkedAlt} title="Sites"/> Sites</Link>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopSidebar);
