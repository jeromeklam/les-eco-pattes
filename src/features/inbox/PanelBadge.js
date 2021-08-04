import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Badge } from 'react-bootstrap-front';
import { InboxEmpty, InboxFull } from '../icons';
import { RedPoint } from '../ui';

export class HeaderBadge extends Component {
  static propTypes = {
    inbox: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Badge
        name="inbox"
        count={this.props.inbox.not_downloaded > 0 && <RedPoint />}
        icon={this.props.inbox.not_downloaded > 0 ? <InboxFull /> : <InboxEmpty />}
        onClick={this.props.onClick}
        className="btn btn-light"
      />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    inbox: state.inbox,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBadge);
