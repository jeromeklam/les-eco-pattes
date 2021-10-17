import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { ResponsiveQuickSearch } from 'react-bootstrap-front';
import {
  Search as SearchIcon,
  Alert as AlertIcon,
} from '../icons';
import { deleteSuccess, showErrors, List as UiList } from '../ui';
import { getGlobalActions, getInlineActions, getCols, Input } from './';

export class List extends Component {
  static propTypes = {
    alert: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      alertId : -1,
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
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    this.setState({ alertId: 0 });
  }

  onGetOne(id) {
    this.setState({ alertId: id });
  }

  onClose() {
    this.setState({ alertId: -1 });
  }

  onDelOne(id) {
    this.props.actions
      .delOne(id)
      .then(result => {
        this.props.actions.loadMore(true);
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
    this.props.actions.loadMore(true);
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
      this.props.actions.loadMore(true);
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
      this.props.actions.loadMore(true);
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
      this.props.actions.loadMore(true);
    }, 2000);
    this.setState({ timer: timer });
  }

  onClearFilters(enable) {
    this.props.actions.initFilters(enable);
    this.props.actions.initSort();
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore(true);
    }, 2000);
    this.setState({ timer: timer });
  }

  render() {
    let items = [];
    if (this.props.alert.items.FreeFW_Alert) {
      items = normalizedObjectModeler(this.props.alert.items, 'FreeFW_Alert');
    }
    const counter = this.props.alert.items.length + ' / ' + this.props.alert.totalItems;

    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const cols = getCols(this);
    // L'affichage, items, loading, loadMoreError
    let search = '';
    const crit = this.props.alert.filters.findFirst('alert_title');
    if (crit) {
      search = crit.getFilterCrit();
    }
    const quickSearch = (
      <ResponsiveQuickSearch
        name="quickSearch"
        label="Recherche libellé, description"
        quickSearch={search}
        onSubmit={this.onQuickSearch}
        onChange={this.onSearchChange}
        icon={<SearchIcon className="text-secondary" />}
      />
    );
    return (
      <div>
        <UiList
          title="Tâches"
          cols={cols}
          icon={<AlertIcon />}
          items={items}
          quickSearch={quickSearch}
          mainCol="alert_title"
          inlineActions={inlineActions}
          globalActions={globalActions}
          sort={this.props.alert.sort}
          filters={this.props.alert.filters}
          onSearch={this.onQuickSearch}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onClearFilters={this.onClearFilters}
          onLoadMore={this.onLoadMore}
          loadMorePending={this.props.alert.loadMorePending}
          loadMoreFinish={this.props.alert.loadMoreFinish}
          loadMoreError={this.props.alert.loadMoreError}
          inlineOpenedItem={this.state.item}
          onClick={this.onSelectList}
          currentItem={this.state.item}
          currentInline={this.state.mode} 
          counter={counter}
          fClassName={this.itemClassName}
        />
        {this.state.alertId > 0 && (
          <Input modal={true} alert_id={this.state.alertId} onClose={this.onClose} />
        )}
        {this.state.alertId === 0 && (
          <Input modal={true} onClose={this.onClose} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    alert: state.alert,
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
