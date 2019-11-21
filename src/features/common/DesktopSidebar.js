import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink,
         withRouter 
} from 'react-router-dom';
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
      menuDataOpen: false
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle () {
    this.setState({menuDataOpen: !this.state.menuDataOpen});
  }

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
              <a className="nav-link" href="#" onClick={this.onToggle}>
                <DataIcon/>
                Données
              </a>
              {this.state.menuDataOpen &&
                <div className="nav-link-group">
                  <NavLink strict className="nav-link" to="/data">
                    Divers
                  </NavLink>
                  <NavLink strict className="nav-link" to="/site-type">
                    Type de site
                  </NavLink>
                  <NavLink strict className="nav-link" to="/cause-type">
                    Type d'animaux
                  </NavLink>
                </div>
              }
            </div>
          </div>
        </CSSTransition>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopSidebar));
