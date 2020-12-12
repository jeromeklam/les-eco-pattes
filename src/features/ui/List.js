import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ResponsiveList, Filter } from 'react-bootstrap-front';

import {
  FilterEmpty as FilterEmptyIcon,
  FilterFull as FilterFullIcon,
  FilterClear as FilterClearIcon,
  FilterDefault as FilterDefaultIcon,
  FilterClearDefault as FilterClearDefaultIcon,
  SimpleCancel as CancelPanelIcon,
  SimpleValid as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
  Calendar as CalendarIcon,
  DelOne as ClearIcon,
  More as MoreIcon,
  Close as CloseIcon,
} from '../icons';

export class List extends Component {
  static propTypes = {
    cols: PropTypes.array.isRequired,
    counter: PropTypes.string,
    fClassName: PropTypes.func,
    filters: PropTypes.object,
    globalActions: PropTypes.array,
    inlineActions: PropTypes.array,
    inlineComponent: PropTypes.element,
    currentItem: PropTypes.object,
    items: PropTypes.array.isRequired,
    loadMoreError: PropTypes.element,
    loadMoreFinish: PropTypes.bool,
    loadMorePending: PropTypes.bool,
    mainCol: PropTypes.string,
    onClearFilters: PropTypes.func,
    onClearFiltersDefault: PropTypes.func,
    onClick: PropTypes.func,
    onLoadMore: PropTypes.func,
    onSearch: PropTypes.func,
    onSetFiltersAndSort: PropTypes.func,
    onSort: PropTypes.func,
    quickSearch: PropTypes.element,
    sort: PropTypes.array,
    title: PropTypes.string.isRequired,
    titleMultiline: PropTypes.bool,
    selected: PropTypes.object,
    selectMenu: PropTypes.array,
    onSelect: PropTypes.func,
  };
  static defaultProps = {
    counter: null,
    fClassName: () => {},
    filters: new Filter(),
    globalActions: [],
    inlineActions: [],
    inlineComponent: null,
    currentItem: null,
    loadMoreError: null,
    loadMoreFinish: false,
    loadMorePending: false,
    mainCol: '',
    onClearFilters: () => {},
    onClearFiltersDefault: () => {},
    onClick: () => {},
    onLoadMore: () => {},
    onSearch: () => {},
    onSetFiltersAndSort: () => {},
    onSort: () => {},
    quickSearch: null,
    sort: [],
    titleMultiline: false,
    selected: {},
    selectMenu: [],
    onSelect: () => {},
  };

  render() {
    return (
      <ResponsiveList
        title={this.props.title}
        calIcon={<CalendarIcon className="text-secondary" />}
        cancelPanelIcon={<CancelPanelIcon />}
        clearIcon={<ClearIcon className="text-warning" />}
        closeIcon={<CloseIcon />}
        counter={this.props.counter}
        cols={this.props.cols}
        fClassName={this.props.fClassName}
        filters={this.props.filters}
        filterFullIcon={<FilterFullIcon color="white" />}
        filterEmptyIcon={<FilterEmptyIcon color="white" />}
        filterClearIcon={<FilterClearIcon color="white" />}
        filterDefaultIcon={<FilterDefaultIcon color="white" />}
        filterClearDefaultIcon={<FilterClearDefaultIcon color="white" />}
        globalActions={this.props.globalActions}
        inlineOpenedId={
          this.props.currentItem && this.props.inlineComponent && this.props.currentItem.id
        }
        inlineOpenedItem={this.props.currentItem}
        inlineComponent={this.props.inlineComponent}
        inlineActions={this.props.inlineActions}
        items={this.props.items}
        loadMoreError={this.props.loadMoreError}
        loadMoreFinish={this.props.loadMoreFinish}
        loadMorePending={this.props.loadMorePending}
        mainCol={this.props.mailCol}
        mode={
          this.props.auth.settings.layout && this.props.auth.settings.layout.listdetails
            ? this.props.auth.settings.layout.listdetails
            : 'right'
        }
        moreIcon={<MoreIcon className="text-secondary" />}
        onSearch={this.props.onSearch}
        onSort={this.props.onSort}
        onSetFiltersAndSort={this.props.onSetFiltersAndSort}
        onClearFilters={this.props.onClearFilters}
        onClearFiltersDefault={this.props.onClearFiltersDefault}
        onLoadMore={this.props.onLoadMore}
        onClick={this.props.onClick}
        quickSearch={this.props.quickSearch}
        sort={this.props.sort}
        sortDownIcon={<SortDownIcon color="secondary" />}
        sortNoneIcon={<SortNoneIcon color="secondary" />}
        sortUpIcon={<SortUpIcon color="secondary" />}
        titleMultiline={this.props.titleMultiline}
        validPanelIcon={<ValidPanelIcon />}
        selected={this.props.selected}
        selectMenu={this.props.selectMenu}
        onSelect={this.props.onSelect}
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
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
