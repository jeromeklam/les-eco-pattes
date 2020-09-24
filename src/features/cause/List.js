import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'freejsonapi';
import { ResponsiveList, ResponsiveQuickSearch } from 'freeassofront';
import { loadMovements } from '../cause-movement/redux/actions';
import { loadGrowths } from '../cause-growth/redux/actions';
import { loadSicknesses } from '../cause-sickness/redux/actions';
import {
  Close as CloseIcon,
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
  DelOne as ClearIcon,
  Calendar as CalendarIcon,
} from '../icons';
import { deleteSuccess, showErrors } from '../ui';
import { InlineMovements } from '../cause-movement';
import { InlineSicknesses } from '../cause-sickness';
import { InlineGrowths } from '../cause-growth';
import { Create as CreateMovement } from '../movement';
import {
  InlineCauses,
  InlinePhotos,
  Create,
  Modify,
  InlineDocuments,
  getSelectActions,
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
      menu: null,
      menuOption: null,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onFiltersDefault = this.onFiltersDefault.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onSelectList = this.onSelectList.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSelectMenu = this.onSelectMenu.bind(this);
    this.itemClassName = this.itemClassName.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    this.setState({ cauId: 0 });
  }

  onGetOne(id) {
    this.setState({ cauId: id, mode: false, item: null, menu: null, });
  }

  onClose() {
    this.setState({ cauId: -1, menu: null });
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

  onSelect(id) {
    this.props.actions.onSelect(id);
  }

  onSelectList(obj, list) {
    if (obj) {
      if (list) {
        this.setState({ mode: list, item: obj });
      } else {
        this.setState({ item: obj });
      }
    } else {
      this.setState({ mode: false, item: null });
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

  onLoadMore(event) {
    this.props.actions.loadMore();
  }

  itemClassName(item) {
    if (item && item.cau_to !== null && item.cau_to !== '') {
      return 'row-line-warning';
    }
    return '';
  }

  onSelectMenu(option) {
    switch (option) {
      case 'selectAll':
        this.setState({ menu: null, cauid: -1 });
        this.props.actions.selectAll();
        break;
      case 'selectNone':
        this.setState({ menu: null, cauid: -1 });
        this.props.actions.selectNone();
        break;
      default:
        this.setState({ menu: 'movement', menuOption: option, cauid: -1 });
        break;
    }
  }

  render() {
    let items = [];
    if (this.props.cause.items.FreeAsso_Cause) {
      items = normalizedObjectModeler(this.props.cause.items, 'FreeAsso_Cause');
    }
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const selectActions = getSelectActions(this);
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
    let inlineComponent = null;
    let id = null;
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
          selectMenu={selectActions}
          quickSearch={quickSearch}
          mainCol="cau_code"
          cancelPanelIcon={<CancelPanelIcon />}
          validPanelIcon={<ValidPanelIcon />}
          sortDownIcon={<SortDownIcon color="secondary" />}
          sortUpIcon={<SortUpIcon color="secondary" />}
          sortNoneIcon={<SortNoneIcon color="secondary" />}
          calIcon={<CalendarIcon className="text-secondary" />}
          clearIcon={<ClearIcon className="text-warning" />}
          closeIcon={<CloseIcon />}
          inlineActions={inlineActions}
          inlineOpenedId={id}
          inlineOpenedItem={this.state.item}
          inlineComponent={inlineComponent}
          globalActions={globalActions}
          sort={this.props.cause.sort}
          filters={this.props.cause.filters}
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
          onSelect={this.onSelect}
          onClick={this.onSelectList}
          loadMorePending={this.props.cause.loadMorePending}
          loadMoreFinish={this.props.cause.loadMoreFinish}
          loadMoreError={this.props.cause.loadMoreError}
          fClassName={this.itemClassName}
        />
        {this.state.cauId > 0 && (
          <Modify modal={true} cauId={this.state.cauId} onClose={this.onClose} loader={false} />
        )}
        {this.state.cauId === 0 && <Create modal={true} onClose={this.onClose} loader={false} />}
        {this.state.menu === 'movement' && <CreateMovement loader={false} modal={true} mode={this.state.menuOption} onClose={this.onClose} selected={selected} />}
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
