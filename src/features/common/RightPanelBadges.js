import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { HighlightButton } from 'react-bootstrap-front';
import { connect } from 'react-redux';
import IdleTimer from 'react-idle-timer';
import * as actions from './redux/actions';
import { PanelBadge } from '../inbox';
import { Help as HelpIcon } from '../icons';

export class RightPanelBadges extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      animated: false,
    };
    this.idleTimer = null;
    this.handleOnAction = this.handleOnAction.bind(this);
    this.handleOnActive = this.handleOnActive.bind(this);
    this.handleOnIdle = this.handleOnIdle.bind(this);
    this.openPanel = this.openPanel.bind(this);
  }

  openPanel(panel) {
    this.props.actions.setPanel(panel);
  }

  handleOnAction(event) {
    this.setState({ animated: false });
  }

  handleOnActive(event) {
    this.setState({ animated: false });
  }

  handleOnIdle(event) {
    this.setState({ animated: true });
  }

  render() {
    return (
      <div className="common-right-panel-badges">
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref;
          }}
          timeout={1000 * 15}
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
          onAction={this.handleOnAction}
          debounce={250}
        />
        <ul className="common-right-panel-badges-list navbar-nav">
          <li className="common-right-panel-badges-item nav-item">
            <PanelBadge onClick={ev => this.openPanel('inbox')} />
          </li>
        </ul>
        <HighlightButton theme="NAV">
          <div
            title="Aide"
            style={{ position: 'absolute', bottom: '4px' }}
            className={classnames(this.state.animated && 'bouncing-help')}
          >
            <button
              className={classnames(
                'btn btn-light text-secondary bouncing-help-icon btn--shockwave',
                this.state.animated && 'is-active',
              )}
            >
              <HelpIcon />
            </button>
          </div>
        </HighlightButton>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanelBadges);
