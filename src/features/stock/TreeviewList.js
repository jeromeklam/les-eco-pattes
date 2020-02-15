import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ResponsiveTreeviewList } from 'freeassofront';
import * as actions from './redux/actions';
import { Treeview } from '../family';

export class TreeviewList extends Component {
  static propTypes = {
    stock: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="stock-treeview-list">
        <ResponsiveTreeviewList
          title="Stock"
          treeview={<Treeview />}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    stock: state.stock,
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
)(TreeviewList);
