import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { buildModel } from 'freejsonapi';
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
      let causes = [];
      if (this.props.site.causes && this.props.site.causes.length) {
        causes = buildModel(this.props.site.causes, 'FreeAsso_Cause');
      }
      return (
        <InlineListDetail causes={causes} />
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
