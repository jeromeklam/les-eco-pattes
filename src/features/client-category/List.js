import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from 'freejsonapi';
import { ResponsiveList, ResponsiveQuickSearch } from 'freeassofront';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  Filter as FilterIcon,
  FilterFull as FilterFullIcon,
  FilterClear as FilterClearIcon,
  SimpleCancel as CancelPanelIcon,
  SimpleValid as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
  Search as SearchIcon,
} from '../icons';
import { deleteSuccess, deleteError } from '../ui';

export class List extends Component {
  static propTypes = {
    clientCategory: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/client-category/create');
  }

  onGetOne(id) {
    this.props.history.push('/client-category/modify/' + id);
  }

  onDelOne(id) {
    this.props.actions.delOne(id).then(result => this.props.actions.loadMore({}, true));
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

  onClearFilters() {
    this.props.actions.initFilters();
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

  render() {
    let items = [];
    if (this.props.clientCategory.items.FreeAsso_ClientCategory) {
      items = buildModel(this.props.clientCategory.items, 'FreeAsso_ClientCategory');
    }
    const globalActions = [
      {
        name: 'clear',
        label: 'Effacer',
        onClick: this.onClearFilters,
        theme: 'secondary',
        icon: <FilterClearIcon color="white" />,
      },
      {
        name: 'create',
        label: 'Ajouter',
        onClick: this.onCreate,
        theme: 'primary',
        icon: <AddOneIcon color="white" />,
      },
    ];
    const inlineActions = [
      {
        name: 'modify',
        label: 'Modifier',
        onClick: this.onGetOne,
        theme: 'secondary',
        icon: <GetOneIcon color="white" />,
      },
      {
        name: 'delete',
        label: 'Supprimer',
        onClick: this.onDelOne,
        theme: 'warning',
        icon: <DelOneIcon color="white" />,
      },
    ];
    const cols = [
      {
        name: 'clic_name',
        label: 'Nom',
        col: 'clic_name',
        size: '30',
        mob_size: '36',
        title: false,
      }
    ];
    let search = '';
    const crit = this.props.clientCategory.filters.findFirst('clic_name');
    if (crit) {
      search = crit.getFilterCrit();
    }
    const quickSearch = (
      <ResponsiveQuickSearch
        name="quickSearch"
        label="Recherche nom, prénom"
        quickSearch={search}
        onSubmit={this.onQuickSearch}
        onChange={this.onSearchChange}
        icon={<SearchIcon className="text-secondary" />}
      />
    );
    const filterIcon = this.props.clientCategory.filters.isEmpty() ? (
      <FilterIcon color="white" />
    ) : (
      <FilterFullIcon color="white" />
    );
    // L'affichage, items, loading, loadMoreError
    return (
      <ResponsiveList
        title="Catégories de client"
        cols={cols}
        items={items}
        quickSearch={quickSearch}
        mainCol="clic_name"
        filterIcon={filterIcon}
        cancelPanelIcon={<CancelPanelIcon />}
        validPanelIcon={<ValidPanelIcon />}
        sortDownIcon={<SortDownIcon color="secondary" />}
        sortUpIcon={<SortUpIcon color="secondary" />}
        sortNoneIcon={<SortNoneIcon color="secondary" />}
        inlineActions={inlineActions}
        globalActions={globalActions}
        sort={this.props.clientCategory.sort}
        filters={this.props.clientCategory.filters}
        onSearch={this.onQuickSearch}
        onSort={this.onUpdateSort}
        onSetFiltersAndSort={this.onSetFiltersAndSort}
        onClearFilters={this.onClearFilters}
        onLoadMore={this.onLoadMore}
        loadMorePending={this.props.clientCategory.loadMorePending}
        loadMoreFinish={this.props.clientCategory.loadMoreFinish}
        loadMoreError={this.props.clientCategory.loadMoreError}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    clientCategory: state.clientCategory,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
