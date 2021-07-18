import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { ResponsiveQuickSearch } from 'react-bootstrap-front';
import { loadMovements } from '../cause-movement/redux/actions';
import { loadGrowths } from '../cause-growth/redux/actions';
import { loadSicknesses } from '../cause-sickness/redux/actions';
import { Search as SearchIcon } from '../icons';
import { List as UiList, deleteSuccess, showErrors, messageSuccess } from '../ui';
import { InlineMovements } from '../cause-movement';
import { InlineSicknesses } from '../cause-sickness';
import { InlineGrowths } from '../cause-growth';
import { Create as CreateMovement } from '../movement';
import {
  InlineCauses,
  InlinePhotos,
  Input,
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
    this.setState({ cauId: id, mode: false, item: null, menu: null });
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
        showErrors(this.props.intl, errors, '', 'Suppression impossible ! ');
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

  onSelectMenu(option) {
    switch (option) {
      case 'selectAll':
        this.setState({ menu: null, cauId: -1 });
        this.props.actions.selectAll();
        break;
      case 'selectNone':
        this.setState({ menu: null, cauId: -1 });
        this.props.actions.selectNone();
        break;
      case 'exportAll':
        this.props.actions.exportAsTab('all').then(res => {
          if (!res) {
            messageSuccess('Export demandé');
          }
        });
        break;
      case 'exportSelection':
        this.props.actions.exportAsTab('selection').then(res => {
          if (!res) {
            messageSuccess('Export demandé');
          }
        });
        break;
      default:
        this.setState({ menu: 'movement', menuOption: option, cauId: -1 });
        break;
    }
  }

  itemClassName(item) {
    if (item && item.cau_to !== null && item.cau_to !== '') {
      return 'row-line-warning';
    }
    return '';
  }

  render() {
    let items = [];
    if (this.props.cause.items.FreeAsso_Cause) {
      items = normalizedObjectModeler(this.props.cause.items, 'FreeAsso_Cause');
    }
    const counter = this.props.cause.items.length + ' / ' + this.props.cause.totalItems;

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
    switch (this.state.mode) {
      case 'document':
        inlineComponent = <InlineDocuments cauId={this.state.item.id} />;
        break;
      case 'photo':
        inlineComponent = <InlinePhotos cauId={this.state.item.id} />;
        break;
      case 'movement':
        inlineComponent = <InlineMovements cause={this.state.item} />;
        break;
      case 'growth':
        inlineComponent = <InlineGrowths cause={this.state.item} />;
        break;
      case 'descendant':
        inlineComponent = <InlineCauses mode="cause" cause={this.state.item} />;
        break;
      case 'sickness':
        inlineComponent = <InlineSicknesses cause={this.state.item} />;
        break;
      default:
        break;
    }
    const { selected } = this.props.cause;
    return (
      <div>
        <UiList
          title="Animaux"
          cols={cols}
          items={items}
          quickSearch={quickSearch}
          mainCol="cau_code"
          inlineOpenedItem={this.state.item}
          onClick={this.onSelectList}
          currentItem={this.state.item}
          currentInline={this.state.mode}
          inlineComponent={inlineComponent}
          inlineActions={inlineActions}
          globalActions={globalActions}
          sort={this.props.cause.sort}
          filters={this.props.cause.filters}
          onSearch={this.onQuickSearch}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onClearFilters={() => this.onFiltersDefault(true)}
          onClearFiltersDefault={() => this.onFiltersDefault(false)}
          onLoadMore={this.onLoadMore}
          loadMorePending={this.props.cause.loadMorePending}
          loadMoreFinish={this.props.cause.loadMoreFinish}
          loadMoreError={this.props.cause.loadMoreError}
          counter={counter}
          selected={selected}
          selectMenu={selectActions}
          onSelect={this.onSelect}
          fClassName={this.itemClassName}
        />
        {this.state.cauId > 0 && (
          <Input modal={true} cauId={this.state.cauId} onClose={this.onClose} loader={false} />
        )}
        {this.state.cauId === 0 && <Input modal={true} onClose={this.onClose} loader={false} />}
        {this.state.menu === 'movement' && (
          <CreateMovement
            loader={false}
            modal={true}
            mode={this.state.menuOption}
            onClose={this.onClose}
            selected={selected}
          />
        )}
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
    actions: bindActionCreators(
      { ...actions, loadMovements, loadGrowths, loadSicknesses },
      dispatch,
    ),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(List));
