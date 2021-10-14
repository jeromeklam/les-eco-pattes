import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { ResponsiveQuickSearch } from 'react-bootstrap-front';
import {
  Search as SearchIcon,
  Person as ClientIcon
} from '../icons';
import { List as UiList, deleteSuccess, showErrors, messageSuccess } from '../ui';
import { getGlobalActions, getInlineActions, getSelectActions, getCols, Input } from './';

export class List extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      cliId: -1,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectList = this.onSelectList.bind(this);
    this.onSelectMenu = this.onSelectMenu.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    this.setState({ cliId: 0 });
  }

  onGetOne(id) {
    this.setState({ cliId: id });
  }

  onClose() {
    this.setState({ cliId: -1 });
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

  onSelectMenu(option) {
    switch (option) {
      case 'selectAll':
        this.setState({ menu: null, cliId: -1 });
        this.props.actions.selectAll();
        break;
      case 'selectNone':
        this.setState({ menu: null, cliId: -1 });
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
        this.setState({ menu: 'movement', menuOption: option, cliId: -1 });
        break;
    }
  }

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.client.items.FreeAsso_Client) {
      items = normalizedObjectModeler(this.props.client.items, 'FreeAsso_Client');
    }
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const selectActions = getSelectActions(this);
    const cols = getCols(this);
    // L'affichage, items, loading, loadMoreError
    let search = '';
    const crit = this.props.client.filters.findFirst('cli_firstname');
    if (crit) {
      search = crit.getFilterCrit();
    }
    const quickSearch = (
      <ResponsiveQuickSearch
        name="quickSearch"
        label="Recherche Nom, Type, Catégorie"
        quickSearch={search}
        onSubmit={this.onQuickSearch}
        onChange={this.onSearchChange}
        icon={<SearchIcon className="text-secondary" />}
      />
    );
    const counter = this.props.client.items.length + ' / ' + this.props.client.totalItems;
    const { selected } = this.props.client;
    return (
      <div>
        <UiList
          title="Contacts"
          icon={<ClientIcon />}
          cols={cols}
          items={items}
          counter={counter}
          quickSearch={quickSearch}
          mainCol="cli_firstname"
          onClick={this.onSelectList}
          currentItem={this.state.item}
          currentInline={this.state.mode}
          inlineActions={inlineActions}
          globalActions={globalActions}
          sort={this.props.client.sort}
          filters={this.props.client.filters}
          panelObject="client"
          onSearch={this.onQuickSearch}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onClearFilters={this.onClearFilters}
          onLoadMore={this.onLoadMore}
          loadMorePending={this.props.client.loadMorePending}
          loadMoreFinish={this.props.client.loadMoreFinish}
          loadMoreError={this.props.client.loadMoreError}
          selected={selected}
          selectMenu={selectActions}
          onSelect={this.onSelect}
        />
        {this.state.cliId > 0 && (
          <Input modal={true} cliId={this.state.cliId} onClose={this.onClose} />
        )}
        {this.state.cliId === 0 && <Input modal={true} onClose={this.onClose} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.client,
    clientCategory: state.clientCategory,
    clientType: state.clientType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(List));
