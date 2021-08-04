import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { PanelBadge } from '../inbox';

export class RightPanelBadges extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.openPanel = this.openPanel.bind(this);
  }

  openPanel(panel) {
    this.props.actions.setPanel(panel);
  }

  render() {
    return (
      <div className="common-right-panel-badges">
        <ul className="common-right-panel-badges-list navbar-nav">
          <li className="common-right-panel-badges-item nav-item">
            <PanelBadge onClick={ev => this.openPanel('inbox')} />
          </li>
        </ul>
      </div>
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanelBadges);
