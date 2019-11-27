import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';
import HomeIcon from '../icons/Home';
import SiteIcon from '../icons/Site';
import CauseIcon from '../icons/Cause';
import DataIcon from '../icons/Data';

export class MobileFooter extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <footer className="mobile-footer">
        <div className="row">
          <div className="col-9 text-center">
            <Link className="nav-link" to="/">
              <HomeIcon color="white" />
            </Link>
          </div>
          <div className="col-9 text-center">
            <Link className="nav-link" to="/site">
              <SiteIcon color="white" />
            </Link>
          </div>
          <div className="col-9 text-center">
            <Link className="nav-link" to="/cause">
              <CauseIcon color="white" />
            </Link>
          </div>
          <div className="col-9 text-center">
            <a className="nav-link" href="#" onClick={this.props.onToggle}>
              <DataIcon color="white" />
            </a>
          </div>
        </div>
      </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileFooter);
