import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { CenteredLoading3Dots } from '../ui';
import { InlineListDetail } from '../cause';

export class InlineCauses extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    if (this.props.site.loadCausesPending) {
      return (
        <CenteredLoading3Dots />
      );
    } else {
      return (
        <InlineListDetail causes={this.props.site.causesModels} />
      );
    }
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    site: state.site,
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
)(InlineCauses);
