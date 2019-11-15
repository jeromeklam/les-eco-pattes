import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { SocialIcon } from 'react-social-icons';

export class DesktopFooter extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <span className="text-muted">{process.env.REACT_APP_APP_NAME}</span>
            </div>
            <div className="col-4 text-right">
              <SocialIcon url="https://www.facebook.com/Les-%C3%A9co-pattes-140387953308320/" />
            </div>
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
)(DesktopFooter);
