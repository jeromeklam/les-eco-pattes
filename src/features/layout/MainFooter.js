import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { SocialIcon } from 'react-social-icons';

export class MainFooter extends Component {
  static propTypes = {
    layout: PropTypes.object.isRequired,
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
    layout: state.layout,
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
)(MainFooter);
