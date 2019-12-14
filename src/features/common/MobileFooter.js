import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  Map as MapIcon,
  Site as SiteIcon,
  Cause as CauseIcon,
  Data as DataIcon,
  About as AboutIcon,
} from '../icons';

export class MobileFooter extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <footer className="mobile-footer">
        {this.props.auth.authenticated ? (
          <div className="row">
            <div className="col-7 text-center">
              <Link className="nav-link" to="/">
                <HomeIcon color="white" />
              </Link>
            </div>
            <div className="col-7 text-center">
              <Link className="nav-link" to="/pigeon-map">
                <MapIcon color="white" />
              </Link>
            </div>
            <div className="col-7 text-center">
              <Link className="nav-link" to="/site">
                <SiteIcon color="white" />
              </Link>
            </div>
            <div className="col-7 text-center">
              <Link className="nav-link" to="/cause">
                <CauseIcon color="white" />
              </Link>
            </div>
            <div className="col-7 text-center">
              <a className="nav-link" href="#" onClick={this.props.onToggle}>
                <DataIcon color="white" />
              </a>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-9 text-center">
              <Link className="nav-link" to="/">
                <HomeIcon color="white" />
              </Link>
            </div>
            <div className="col-9 text-center"></div>
            <div className="col-9 text-center"></div>
            <div className="col-9 text-center">
              <Link className="nav-link" to="/about">
                <AboutIcon color="white" />
              </Link>
            </div>
          </div>
        )}
      </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileFooter);
