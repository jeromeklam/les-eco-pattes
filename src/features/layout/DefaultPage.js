import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { MainHeader, MainFooter, SidePanel } from '../../features/layout';

export class DefaultPage extends Component {
  static propTypes = {
    layout: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="d-flex" id="wrapper">
        <SidePanel />
        <div id="page-content-wrapper">
          <MainHeader />
          <div className="container-fluid">
            {this.props.children}
          </div>
        </div>
      </div>
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
)(DefaultPage);
