import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { ResponsiveQuickSearch } from 'react-bootstrap-front';
import { InlineCauses } from '../cause-movement';
import { Search as SearchIcon } from '../icons';
import {
  deleteSuccess,
  deleteError,
  validateSuccess,
  validateError,
  List as UiList,
  showErrors,
} from '../ui';
import { getGlobalActions, getInlineActions, getCols, Input } from './';

/**
 * Liste des movements
 */
export class List extends Component {
  /**
   * Y'a quoi dans this.props ?
   */
  static propTypes = {
    movement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      movementId: -1,
      item: null,
      mode: null,
      status: '',
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onSelectList = this.onSelectList.bind(this);
    this.onValid = this.onValid.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    this.setState({ movementId: 0 });
  }

  onGetOne(id) {
    this.setState({ movementId: id });
  }

  onClose() {
    this.setState({ movementId: -1 });
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

  onDelOne(id) {
    this.props.actions
      .delOne(id)
      .then(result => {
        this.props.actions.loadMore({}, true);
        deleteSuccess();
      })
      .catch(errors => {
        deleteError();
      });
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

  onValid(id) {
    this.props.actions
      .validateOne(id)
      .then(result => {
        validateSuccess();
        this.props.actions.loadMore({}, true);
      })
      .catch(errors => {
        validateError();
        showErrors(this.props.intl, errors, 'validOneError');
      });
  }

  /**
   * Génération du contenu
   */
  render() {
    let inlineComponent = null;
    if (this.state.mode === 'cause') {
      inlineComponent = <InlineCauses movement={this.state.item} />;
    }
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.movement.items.FreeAsso_Movement) {
      items = normalizedObjectModeler(this.props.movement.items, 'FreeAsso_Movement');
    }
    // Toolsbars and lists
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const cols = getCols(this);
    // L'affichage, items, loading, loadMoreError
    let search = '';
    const crit = this.props.movement.filters.findFirst('move_tr_name');
    if (crit) {
      search = crit.getFilterCrit();
    }
    const quickSearch = (
      <ResponsiveQuickSearch
        name="quickSearch"
        label="Recherche Sites"
        quickSearch={search}
        onSubmit={this.onQuickSearch}
        onChange={this.onSearchChange}
        icon={<SearchIcon className="text-secondary" />}
      />
    );
    return (
      <div>
        <UiList
          title="Mouvements"
          cols={cols}
          items={items}
          quickSearch={quickSearch}
          mainCol="move_from"
          onClick={this.onSelectList}
          currentItem={this.state.item}
          currentInline={this.state.mode}
          inlineComponent={inlineComponent}
          inlineActions={inlineActions}
          globalActions={globalActions}
          sort={this.props.movement.sort}
          filters={this.props.movement.filters}
          onSearch={this.onQuickSearch}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onClearFilters={this.onClearFilters}
          onLoadMore={this.onLoadMore}
          loadMorePending={this.props.movement.loadMorePending}
          loadMoreFinish={this.props.movement.loadMoreFinish}
          loadMoreError={this.props.movement.loadMoreError}
        />
        {this.state.movementId > 0 && (
          <Input modal={true} move_id={this.state.movementId} onClose={this.onClose} />
        )}
        {this.state.movementId === 0 && <Input modal={true} onClose={this.onClose} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movement: state.movement,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
