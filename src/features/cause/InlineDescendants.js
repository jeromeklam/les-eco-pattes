import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { InlineListDetail } from './';

export class InlineDescendants extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="cause-inline-descendants">
        <InlineListDetail causes={this.props.cause.causesModels} cause={this.props.current}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cause: state.cause,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InlineDescendants);
