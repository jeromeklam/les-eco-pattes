import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { loadMovements } from '../cause-movement/redux/actions';
import { loadGrowths } from '../cause-growth/redux/actions';
import { loadSicknesses } from '../cause-sickness/redux/actions';
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
import { deleteSuccess, showErrors } from '../ui';
import { InlineMovements } from '../cause-movement';
import { InlineSicknesses } from '../cause-sickness';
import { InlineGrowths } from '../cause-growth';
import {
  InlineCauses,
  InlinePhotos,
  Create,
  Modify,
  InlineDocuments,
  getGlobalActions,
  getInlineActions,
  getCols,
} from './';

export class List extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      item: null,
      mode: false,
      cauId: -1,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onSelectList = this.onSelectList.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    this.setState({ cauId: 0 });
  }

  onGetOne(id) {
    this.setState({ cauId: id, mode: false, item: null });
  }

  onClose() {
    this.setState({ cauId: -1 });
  }

  onDelOne(id) {
    this.props.actions
      .delOne(id)
      .then(result => {
        this.props.actions.loadMore({}, true);
        deleteSuccess();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors);
      });
  }

  onSelect(id) {
    this.props.actions.onSelect(id);
  }

  onSelectList(obj, list) {
    const { item, mode } = this.state;
    if (item && item.id === obj.id && mode === list) {
      this.setState({ mode: false, item: null });
    } else {
      this.setState({ mode: list, item: obj });
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
        icon={<SearchIcon className="text-secondary" />}
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
    switch (this.state.mode) {
      case 'document':
        id = this.state.item.id;
        inlineComponent = <InlineDocuments cauId={this.state.item.id} />;
        break;
      case 'photo':
        id = this.state.item.id;
        inlineComponent = <InlinePhotos cauId={this.state.item.id} />;
        break;
      case 'movement':
        id = this.state.item.id;
        inlineComponent = <InlineMovements cause={this.state.item} />;
        break;
      case 'growth':
        id = this.state.item.id;
        inlineComponent = <InlineGrowths cause={this.state.item} />;
        break;
      case 'descendant':
        id = this.state.item.id;
        inlineComponent = <InlineCauses mode="cause" cause={this.state.item} />;
        break;
      case 'sickness':
        id = this.state.item.id;
        inlineComponent = <InlineSicknesses cause={this.state.item} />;
        break;
      default:
        id = 0;
        break;
    }
    const { selected } = this.props.cause;
    return (
      <div>
        <ResponsiveList
          title="Animaux"
          cols={cols}
          items={items}
          selected={selected}
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
          onSelect={this.onSelect}
          loadMorePending={this.props.cause.loadMorePending}
          loadMoreFinish={this.props.cause.loadMoreFinish}
          loadMoreError={this.props.cause.loadMoreError}
        />
        {this.state.cauId > 0 && (
          <Modify modal={true} cauId={this.state.cauId} onClose={this.onClose} />
        )}
        {this.state.cauId === 0 && <Create modal={true} onClose={this.onClose} />}
      </div>
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
    actions: bindActionCreators({ ...actions, loadMovements, loadGrowths, loadSicknesses }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(List));
