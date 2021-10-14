import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../common/redux/actions';
import { injectIntl } from 'react-intl';
import { ResponsiveInlineList as UIResponsiveInlineList } from 'react-bootstrap-front';
import { AddOne as AddOneIcon, GetOne as GetOneIcon, DelOne as DelOneIcon } from '../icons';

export class ResponsiveInlineList extends Component {
  static propTypes = {};

  render() {
    return (
      <UIResponsiveInlineList
        {...this.props}
        t={this.props.intl.formatMessage}
        addIcon={<AddOneIcon className="inline-action text-light" />}
        getIcon={<GetOneIcon className="inline-action text-light" />}
        delIcon={<DelOneIcon className="inline-action text-light" />}
        oddEven={this.props.auth.settings.layout.colorlinesoddeven}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ResponsiveInlineList));
