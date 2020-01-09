import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from 'freejsonapi';
import { ResponsiveList, ResponsiveQuickSearch } from 'freeassofront';
import { causeTypeAsOptions } from '../cause-type/functions';
import { siteAsOptions } from '../site/functions';
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

export class List extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
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
    this.onOpenPhoto = this.onOpenPhoto.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/cause/create');
  }

  onGetOne(id) {
    this.props.history.push('/cause/modify/' + id);
  }

  onOpenPhoto(id) {
    this.props.history.push('/cause/modify/' + id);
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

  onLoadMore(event) {
    this.props.actions.loadMore();
  }

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.cause.items.FreeAsso_Cause) {
      items = buildModel(this.props.cause.items, 'FreeAsso_Cause');
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
        name: 'id',
        label: 'Identifiant',
        col: 'id',
        size: '6',
        mob_size: '',
        title: true,
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'name',
        label: 'Nom',
        col: 'cau_name',
        size: '6',
        mob_size: '',
        title: true,
        sortable: true,
        filterable: { type: 'text' },
      },
      {
        name: 'type',
        label: 'Type',
        col: 'cause_type.caut_name',
        size: '12',
        mob_size: '18',
        title: false,
        sortable: true,
      },
      {
        name: 'site',
        label: 'Site',
        col: 'site.site_name',
        size: '10',
        mob_size: '',
        title: false,
        sortable: true,
      },
      {
        name: 'type',
        label: 'Type',
        col: 'cause_type.caut_id',
        size: '0',
        mob_size: '0',
        hidden: true,
        filterable: {
          type: 'select',
          options: causeTypeAsOptions(this.props.causeType.items),
        },
      },
    ];
    // L'affichage, items, loading, loadMoreError
    let search = '';
    const crit = this.props.cause.filters.findFirst('cau_name');
    if (crit) {
      search = crit.getFilterCrit();
    }
    const quickSearch = (
      <ResponsiveQuickSearch
        name="quickSearch"
        label="Recherche nom"
        quickSearch={search}
        onSubmit={this.onQuickSearch}
        onChange={this.onSearchChange}
        icon={<SearchIcon className="text-secondary"/>}
      />
    );
    const filterIcon = this.props.cause.filters.isEmpty() ? (
      <FilterIcon color="white" />
    ) : (
      <FilterFullIcon color="white" />
    );
    return (
      <ResponsiveList
        title="Causes"
        cols={cols}
        items={items}
        quickSearch={quickSearch}
        mainCol="cau_name"
        filterIcon={filterIcon}
        cancelPanelIcon={<CancelPanelIcon />}
        validPanelIcon={<ValidPanelIcon />}
        sortDownIcon={<SortDownIcon color="secondary" />}
        sortUpIcon={<SortUpIcon color="secondary" />}
        sortNoneIcon={<SortNoneIcon color="secondary" />}
        inlineActions={inlineActions}
        globalActions={globalActions}
        sort={this.props.cause.sort}
        filters={this.props.cause.filters}
        onSearch={this.onQuickSearch}
        onSort={this.onUpdateSort}
        onSetFiltersAndSort={this.onSetFiltersAndSort}
        onClearFilters={this.onClearFilters}
        onLoadMore={this.onLoadMore}
        loadMorePending={this.props.cause.loadMorePending}
        loadMoreFinish={this.props.cause.loadMoreFinish}
        loadMoreError={this.props.cause.loadMoreError}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    cause: state.cause,
    site: state.site,
    causeType: state.causeType,
    causeMainType: state.causeMainType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
