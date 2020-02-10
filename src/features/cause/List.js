import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { loadMovements } from '../cause-movement/redux/actions';
import { loadGrowths } from '../cause-growth/redux/actions';
import { buildModel } from 'freejsonapi';
import { ResponsiveList, ResponsiveQuickSearch } from 'freeassofront';
import {
  Filter as FilterIcon,
  FilterFull as FilterFullIcon,
  SimpleCancel as CancelPanelIcon,
  SimpleValid as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
  Search as SearchIcon,
} from '../icons';
import { deleteSuccess, deleteError } from '../ui';
import { InlineMovements } from '../cause-movement';
import { InlineGrowths } from '../cause-growth';
import { InlineDocuments } from './';
import { getGlobalActions, getInlineActions, getCols } from './';

export class List extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      growthsCause: 0,
      movementsCause: 0,
      documentsCause: 0,
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
    this.onListDocument = this.onListDocument.bind(this);
    this.onListMovement = this.onListMovement.bind(this);
    this.onListGrowth = this.onListGrowth.bind(this);
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
    this.props.actions
      .delOne(id)
      .then(result => {
        this.props.actions.loadMore({}, true);
        deleteSuccess();
      })
      .catch(errors => {
        // @todo display errors to fields
        deleteError();
      });
  }

  onListDocument(obj) {
    const { id } = obj;
    const { documentsCause } = this.state;
    if (documentsCause === id) {
      this.setState({growthsCause: 0, movementsCause: 0, documentsCause: 0});
    } else {
      this.props.actions.loadDocuments(id, true).then(result => {});
      this.setState({growthsCause: 0, movementsCause: 0, documentsCause: id});
    }
  }

  onListMovement(obj) {
    const { id } = obj;
    const { movementsCause } = this.state;
    if (movementsCause === id) {
      this.setState({growthsCause: 0, movementsCause: 0, documentsCause: 0});
    } else {
      this.props.actions.loadMovements(obj, true).then(result => {});
      this.setState({growthsCause: 0, movementsCause: id, documentsCause: 0});
    }
  }

  onListGrowth(obj) {
    const { id } = obj;
    const { growthsCause } = this.state;
    if (growthsCause === id) {
      this.setState({growthsCause: 0, movementsCause: 0, documentsCause: 0});
    } else {
      this.props.actions.loadGrowths(obj, true).then(result => {});
      this.setState({growthsCause: id, movementsCause: 0, documentsCause: 0});
    }
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
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const cols = getCols(this);
    // L'affichage, items, loading, loadMoreError
    let search = '';
    const crit = this.props.cause.filters.findFirst('cau_code');
    if (crit) {
      search = crit.getFilterCrit();
    }
    const quickSearch = (
      <ResponsiveQuickSearch
        name="quickSearch"
        label="Recherche n° boucle"
        quickSearch={search}
        onSubmit={this.onQuickSearch}
        onChange={this.onSearchChange}
        icon={<SearchIcon className="text-secondary"/>}
      />
    );
    const filterIcon = this.props.cause.filters.isEmpty() ? (
      <FilterIcon className="text-light" />
    ) : (
      <FilterFullIcon className="text-light" />
    );
    let inlineComponent = null;
    let id = null;
    let current = null;
    if (this.state.movementsCause > 0) {
      id = this.state.movementsCause;
      current = buildModel(this.props.cause.items, 'FreeAsso_Cause', id);
      inlineComponent = <InlineMovements cause={current} />
      
    } else {
      if (this.state.documentsCause > 0 ) {
        id = this.state.documentsCause;
        current = buildModel(this.props.cause.items, 'FreeAsso_Cause', id);
        inlineComponent = <InlineDocuments cause={current} />
      } else {
        if (this.state.growthsCause > 0 ) {
          id = this.state.growthsCause;
          current = buildModel(this.props.cause.items, 'FreeAsso_Cause', id);
          inlineComponent = <InlineGrowths cause={current} />
        }
      }
    }  
     
    return (
      <ResponsiveList
        title="Animaux"
        cols={cols}
        items={items}
        quickSearch={quickSearch}
        mainCol="cau_code"
        filterIcon={filterIcon}
        cancelPanelIcon={<CancelPanelIcon />}
        validPanelIcon={<ValidPanelIcon />}
        sortDownIcon={<SortDownIcon color="secondary" />}
        sortUpIcon={<SortUpIcon color="secondary" />}
        sortNoneIcon={<SortNoneIcon color="secondary" />}
        inlineActions={inlineActions}
        inlineOpenedId={id}
        inlineComponent={inlineComponent}
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
    actions: bindActionCreators({ ...actions, loadMovements, loadGrowths }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
