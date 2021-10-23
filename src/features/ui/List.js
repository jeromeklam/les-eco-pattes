import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../common/redux/actions';
import { injectIntl } from 'react-intl';
import { ResponsiveList, Filter } from 'react-bootstrap-front';
import { PortalLoader } from './';
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
  MenuDropDown as MenuDownIcon,
  Previous as PreviousIcon,
  Next as NextIcon,
  ListSort as ListSortIcon,
  ListTools as ListToolsIcon,
} from '../icons';

function selectMenu(selected) {
  let nbSel = 0;
  if (selected && Array.isArray(selected)) {
    nbSel = selected.length;
  }
  return (
    <>
      <span className="no-selector">{nbSel}</span>
      <ListToolsIcon />
      <MenuDownIcon />
    </>
  );
}

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
    icon: PropTypes.element,
    items: PropTypes.array.isRequired,
    loadMoreError: PropTypes.element,
    loadMoreFinish: PropTypes.bool,
    loadMorePending: PropTypes.bool,
    mainCol: PropTypes.string,
    onClearFilters: PropTypes.func,
    onClearFiltersDefault: PropTypes.func,
    onClick: PropTypes.func,
    onLoadMore: PropTypes.func,
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
    onSearch: PropTypes.func,
    onSetFiltersAndSort: PropTypes.func,
    onSort: PropTypes.func,
    quickSearch: PropTypes.element,
    sort: PropTypes.array,
    title: PropTypes.string.isRequired,
    titleMultiline: PropTypes.bool,
  };
  static defaultProps = {
    counter: null,
    fClassName: () => {},
    filters: new Filter(),
    globalActions: [],
    icon: null,
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
    onNext: null,
    onPrevious: null,
    onSearch: () => {},
    onSetFiltersAndSort: () => {},
    onSort: () => {},
    quickSearch: null,
    sort: [],
    titleMultiline: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      mode: 'list',
    };
    this.onFilters = this.onFilters.bind(this);
    this.onSelectView = this.onSelectView.bind(this);
  }

  componentDidMount() {
    this.props.actions.setPanelObj(this.props.panelObject);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.panelObject !== this.props.panelObject) {
      this.props.actions.setPanelObj(this.props.panelObject);
    }
  }

  componentWillUnmount() {
    this.props.actions.setFiltersCols(null, null);
  }

  onSelectView(view) {
    this.setState({ mode: view });
  }

  onFilters() {
    this.props.actions.setPanel('filter', this.props.panelObject);
  }

  render() {
    return (
      <ResponsiveList
        title={this.props.title}
        icon={this.props.icon}
        calIcon={<CalendarIcon className="text-secondary" />}
        cancelPanelIcon={<CancelPanelIcon />}
        clearIcon={<ClearIcon className="text-warning" />}
        closeIcon={<CloseIcon />}
        previousIcon={<PreviousIcon />}
        nextIcon={<NextIcon />}
        counter={this.props.counter}
        cols={this.props.cols}
        fClassName={this.props.fClassName}
        filters={this.props.filters}
        filterFullIcon={<FilterFullIcon />}
        filterEmptyIcon={<FilterEmptyIcon />}
        filterClearIcon={<FilterClearIcon />}
        filterDefaultIcon={<FilterDefaultIcon />}
        filterClearDefaultIcon={<FilterClearDefaultIcon />}
        globalActions={this.props.globalActions}
        currentItem={this.props.currentItem}
        currentInline={this.props.currentInline}
        inlineOpenedId={
          this.props.currentItem && this.props.inlineComponent && this.props.currentItem.id
        }
        inlineOpenedItem={this.props.currentItem}
        inlineComponent={this.props.inlineComponent}
        inlineActions={this.props.inlineActions}
        items={this.props.items}
        loader={<PortalLoader />}
        loadMoreError={this.props.loadMoreError}
        loadMoreFinish={this.props.loadMoreFinish}
        loadMorePending={this.props.loadMorePending}
        mainCol={this.props.mailCol}
        mode={
          this.props.auth.settings.layout && this.props.auth.settings.layout.listdetails
            ? this.props.auth.settings.layout.listdetails
            : 'right'
        }
        moreIcon={<MoreIcon />}
        onSearch={this.props.onSearch}
        onSort={this.props.onSort}
        onFilters={this.onFilters}
        onSetFiltersAndSort={this.props.onSetFiltersAndSort}
        onClearFilters={() => {
          this.props.onClearFilters(false);
        }}
        onClearFiltersDefault={() => {
          this.props.onClearFilters(true);
        }}
        onLoadMore={this.props.onLoadMore}
        onClick={this.props.onClick}
        quickSearch={this.props.quickSearch}
        sort={this.props.sort}
        sortIcon={<><SortNoneIcon /><MenuDownIcon /></>}
        sortDownIcon={<SortDownIcon color="secondary" />}
        sortNoneIcon={<SortNoneIcon />}
        sortUpIcon={<SortUpIcon color="secondary" />}
        titleMultiline={this.props.titleMultiline}
        validPanelIcon={<ValidPanelIcon />}
        selected={this.props.selected}
        selectMenuIcon={<><ListToolsIcon /><MenuDownIcon /></>}
        selectMenu={this.props.selectMenu}
        onSelect={this.props.onSelect}
        onPrevious={this.props.onPrevious}
        onNext={this.props.onNext}
        t={this.props.intl.formatMessage}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
    auth: state.auth,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(List));