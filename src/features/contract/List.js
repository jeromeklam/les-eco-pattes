import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { ResponsiveQuickSearch } from 'react-bootstrap-front';
import { Search as SearchIcon, Contract as ContractIcon } from '../icons';
import { InlineAlerts } from '../alert';
import { deleteSuccess, showErrors, List as UiList } from '../ui';
import { getGlobalActions, getInlineActions, getCols, Input, InlineDocuments } from './';

export class List extends Component {
  static propTypes = {
    contract: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      ctId: -1,
      mode: null,
      documents: 0,
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
    this.onSelectList = this.onSelectList.bind(this);
    this.itemClassName = this.itemClassName.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    this.setState({ ctId: 0, documents: 0 });
  }

  onGetOne(id) {
    this.setState({ ctId: id, documents: 0 });
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

  itemClassName(item) {
    const now = new Date().toISOString();
    if (item && item.ct_to !== null && item.ct_to !== '' && item.ct_to < now ) {
      return 'row-line-warning';
    }
    return '';
  }

  render() {
    let items = [];
    if (this.props.contract.items.FreeAsso_Contract) {
      items = normalizedObjectModeler(this.props.contract.items, 'FreeAsso_Contract');
    }
    // Inline Element
    let inlineComponent = null;
    switch (this.state.mode) {
      case 'alert':
        inlineComponent = (
          <InlineAlerts
            mode="contract"
            objId={this.state.item.id}
            objName="FreeAsso_Contract"
            object={this.state.item}
          />
        );
        break;
      case 'bill':
        break;
      case 'document':
        inlineComponent = <InlineDocuments ctId={this.state.item.id} />;
        break;
      default:
        break;
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
    const counter = this.props.contract.items.length + ' / ' + this.props.contract.totalItems;
    return (
      <div>
        <UiList
          title="Contrats"
          icon={<ContractIcon />}
          cols={cols}
          items={items}
          counter={counter}
          quickSearch={quickSearch}
          mainCol="ct_code"
          onClick={this.onSelectList}
          currentItem={this.state.item}
          currentInline={this.state.mode}
          inlineComponent={inlineComponent}
          inlineActions={inlineActions}
          globalActions={globalActions}
          sort={this.props.contract.sort}
          panelObject="contract"
          filters={this.props.contract.filters}
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
          <Input modal={true} ctId={this.state.ctId} onClose={this.onClose} />
        )}
        {this.state.ctId === 0 && <Input modal={true} onClose={this.onClose} />}
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(List));
