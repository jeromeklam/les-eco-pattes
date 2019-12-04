import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class List extends Component {
  static propTypes = {
    clientCategory: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="client-category-list">
        Page Content: client-category/List
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    clientCategory: state.clientCategory,
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
)(List);
