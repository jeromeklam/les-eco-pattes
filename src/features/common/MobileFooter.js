import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';
import HomeIcon from '../icons/Home';
import SiteIcon from '../icons/Site';
import CauseIcon from '../icons/Cause';

export class MobileFooter extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
       <footer className="mobile-footer">
        <div className="row">
          <div className="col-4">
            <Link className="nav-link" to="/">
              <HomeIcon/>
            </Link>
          </div>
          <div className="col-4">
            <Link className="nav-link" to="/site">
              <SiteIcon/>
            </Link>
          </div>
          <div className="col-4">
            <Link className="nav-link" to="/">
              <CauseIcon/>
            </Link>
          </div>
        </div>
      </footer>
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
)(MobileFooter);
