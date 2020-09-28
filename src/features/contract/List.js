import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { ResponsiveList, ResponsiveQuickSearch } from 'react-bootstrap-front';
import {
  FilterEmpty as FilterEmptyIcon,
  FilterFull as FilterFullIcon,
  FilterClear as FilterClearIcon,
  FilterDefault as FilterDefaultIcon,
  FilterClearDefault as FilterClearDefaultIcon,
  SimpleCancel as CancelPanelIcon,
  SimpleCheck as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
  Search as SearchIcon,
  Calendar as CalendarIcon,
  DelOne as ClearDateIcon,
} from '../icons';
import { deleteSuccess, showErrors } from '../ui';
import { getGlobalActions, getInlineActions, getCols } from './';
import { Create, Modify } from './';

export class List extends Component {
  static propTypes = {
    contract: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      ctId : -1,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onFiltersDefault = this.onFiltersDefault.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.itemClassName = this.itemClassName.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    this.setState({ ctId: 0 });
  }

  onGetOne(id) {
    this.setState({ ctId: id });
  }

  onClose() {
    this.setState({ ctId: -1 });
  }

  onDelOne(id) {
    this.props.actions
      .delOne(id)
      .then(result => {
        this.props.actions.loadMore({}, true);
        deleteSuccess();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, "", "Suppression impossible ! ");
      });
  }

  onReload(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.actions.loadMore({}, true);
  }

  onLoadMore(event) {
    this.props.actions.loadMore();
  }

  onQuickSearch(quickSearch) {
    this.props.actions.updateQuickSearch(quickSearch);
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, 2000);
    this.setState({ timer: timer });
  }

  onUpdateSort(col, way, pos = 99) {
    this.props.actions.updateSort(col.col, way, pos);
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, 2000);
    this.setState({ timer: timer });
  }

  onSetFiltersAndSort(filters, sort) {
    this.props.actions.setFilters(filters);
    this.props.actions.setSort(sort);
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, 2000);
    this.setState({ timer: timer });
  }

  onFiltersDefault(enable) {
    this.props.actions.initFilters(enable);
    this.props.actions.initSort();
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, 2000);
    this.setState({ timer: timer });
  }

  itemClassName(item) {
    if (item && item.ct_to !== null && item.ct_to !== '') {
      return 'row-line-warning';
    }
    return '';
  }

  render() {
    let items = [];
    if (this.props.contract.items.FreeAsso_Contract) {
      items = normalizedObjectModeler(this.props.contract.items, 'FreeAsso_Contract');
    }
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const cols = getCols(this);
    // L'affichage, items, loading, loadMoreError
    let search = '';
    const crit = this.props.contract.filters.findFirst('ct_code');
    if (crit) {
      search = crit.getFilterCrit();
    }
    const quickSearch = (
      <ResponsiveQuickSearch
        name="quickSearch"
        label="Recherche numéro"
        quickSearch={search}
        onSubmit={this.onQuickSearch}
        onChange={this.onSearchChange}
        icon={<SearchIcon className="text-secondary" />}
      />
    );
    return (
      <div>
        <ResponsiveList
          title="Contrats"
          cols={cols}
          items={items}
          quickSearch={quickSearch}
          mainCol="ct_code"
          cancelPanelIcon={<CancelPanelIcon color="light" />}
          validPanelIcon={<ValidPanelIcon color="light" />}
          sortDownIcon={<SortDownIcon color="secondary" />}
          sortUpIcon={<SortUpIcon color="secondary" />}
          sortNoneIcon={<SortNoneIcon color="secondary" />}
          calIcon={<CalendarIcon className="text-secondary" />}
          clearIcon={<ClearDateIcon className="text-warning" />}
          inlineActions={inlineActions}
          globalActions={globalActions}
          sort={this.props.contract.sort}
          filters={this.props.contract.filters}
          filterFullIcon={<FilterFullIcon color="white" />}
          filterEmptyIcon={<FilterEmptyIcon color="white" />}
          filterClearIcon={<FilterClearIcon color="white" />}
          filterDefaultIcon={<FilterDefaultIcon color="white" />}
          filterClearDefaultIcon={<FilterClearDefaultIcon color="white" />}
          onSearch={this.onQuickSearch}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onClearFilters={() => this.onFiltersDefault(true)}
          onClearFiltersDefault={() => this.onFiltersDefault(false)}
          onLoadMore={this.onLoadMore}
          loadMorePending={this.props.contract.loadMorePending}
          loadMoreFinish={this.props.contract.loadMoreFinish}
          loadMoreError={this.props.contract.loadMoreError}
          fClassName={this.itemClassName}
        />
        {this.state.ctId > 0 && (
          <Modify modal={true} ctId={this.state.ctId} onClose={this.onClose} />
        )}
        {this.state.ctId === 0 && (
          <Create modal={true} onClose={this.onClose} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contract: state.contract,
    data: state.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(List));
