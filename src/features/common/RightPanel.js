import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Filter } from 'react-bootstrap-front';
import * as actions from './redux/actions';
import { RightPanelBadges, TopPanelBadges, TopPanelHamburger } from './';
import { InlineInbox } from '../inbox';
import { FilterPanel as CauseFilter } from '../cause';
import { FilterPanel as ClientFilter } from '../client';
import { FilterPanel as SiteFilter } from '../site';

export class RightPanel extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      displayContent: false,
      timer: null,
    };
    this.hide = this.hide.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.common.rightPanelOpened !== this.props.common.rightPanelOpened) {
      if (!this.props.common.rightPanelOpened) {
        const timer = setTimeout(this.hide, 1000);
        this.setState({ timer: timer });
      } else {
        if (this.state.timer) {
          clearTimeout(this.state.timer);
        }
        this.setState({ displayContent: true, timer: null });
      }
    }
  }

  hide() {
    this.setState({ displayContent: false });
  }

  toggleFilter(filter = null, sort = null) {
    if (filter instanceof Filter && typeof this.props.common.onFilter === 'function') {
      this.props.common.onFilter(filter, sort);
    } else {
      this.props.actions.toggleRightPanel();
    }
  }

  render() {
    return (
      <div className="common-right-panel">
        <div
          className={classnames(
            'common-right-panel-header',
            this.state.displayContent && 'bg-white',
          )}
        >
          {this.state.displayContent ? (
            <TopPanelBadges />
          ) : (
            <TopPanelHamburger toggleRightPanel={this.props.actions.toggleRightPanel} />
          )}
        </div>
        <div className="common-right-panel-content custom-scrollbar">
          {this.state.displayContent ? (
            {
              filter: {
                cause: <CauseFilter onToggleRightPanel={this.props.actions.toggleRightPanel} />,
                client: <ClientFilter onToggleRightPanel={this.props.actions.toggleRightPanel} />,
                site: <SiteFilter onToggleRightPanel={this.props.actions.toggleRightPanel} />,
              }[this.props.common.panelObj],
              inbox: <InlineInbox />,
            }[this.props.common.panel]
          ) : (
            <RightPanelBadges />
          )}
        </div>
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

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RightPanel),
);
