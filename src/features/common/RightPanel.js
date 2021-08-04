import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { FilterPanel, Filter } from 'react-bootstrap-front';
import * as actions from './redux/actions';
import { RightPanelBadges, TopPanelBadges, TopPanelHamburger } from './';
import {
  FilterEmpty as FilterEmptyIcon,
  FilterFull as FilterFullIcon,
  FilterClear as FilterClearIcon,
  FilterDefault as FilterDefaultIcon,
  FilterClearDefault as FilterClearDefaultIcon,
  SimpleCancel as CancelPanelIcon,
  SimpleValid as ValidPanelIcon,
  Calendar as CalendarIcon,
  DelOne as ClearIcon,
} from '../icons';
import { InlineInbox } from '../inbox';

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
        <div className="common-right-panel-header">
          {this.state.displayContent ? (
            <TopPanelBadges />
          ) : (
            <TopPanelHamburger toggleRightPanel={this.props.actions.toggleRightPanel} />
          )}
        </div>
        <div className="common-right-panel-content custom-scrollbar">
          {this.state.displayContent ? (
            {
              filter: Array.isArray(this.props.common.filtersCols) && (
                <FilterPanel
                  filterFullIcon={<FilterFullIcon color="white" />}
                  filterEmptyIcon={<FilterEmptyIcon color="white" />}
                  filterClearIcon={<FilterClearIcon color="white" />}
                  filterDefaultIcon={<FilterDefaultIcon color="white" />}
                  filterClearDefaultIcon={<FilterClearDefaultIcon color="white" />}
                  calIcon={<CalendarIcon className="text-secondary" />}
                  clearIcon={<ClearIcon className="text-warning" />}
                  validPanelIcon={<ValidPanelIcon />}
                  cancelPanelIcon={<CancelPanelIcon />}
                  cols={this.props.common.filtersCols}
                  filters={this.props.common.filters}
                  sort={this.props.common.sort}
                  onToggleFilter={this.toggleFilter}
                  t={this.props.intl.formatMessage}
                  simpleMode={true}
                />
              ),
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

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RightPanel),
);
