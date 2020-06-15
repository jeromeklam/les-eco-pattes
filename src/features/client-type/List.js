import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from 'freejsonapi';
import { ResponsiveList } from 'freeassofront';
import {
  SimpleCancel as CancelPanelIcon,
  SimpleCheck as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
} from '../icons';
import { deleteError, deleteSuccess } from '../ui';
import { getGlobalActions, getInlineActions, getCols } from './';
import { Create, Modify } from './';

export class List extends Component {
  static propTypes = {
    clientType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      clitId: null,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate() {
    this.setState({ clitId: 0 });
  }

  onGetOne(id) {
    this.setState({ clitId: id });
  }

  onClose() {
    this.setState({ clitId: null });
  }

  onDelOne(id) {
      this.props.actions
      .delOne(id)
      .then(result => {
        deleteSuccess();
        this.props.actions.loadMore({}, true)
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

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.clientType.items.FreeAsso_ClientType) {
      items = buildModel(this.props.clientType.items, 'FreeAsso_ClientType');
    }
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const cols = getCols(this);
    // L'affichage, items, loading, loadMoreError
    return (
      <div>
        <ResponsiveList
          title="Types de personne"
          cols={cols}
          items={items}
          mainCol="clit_name"
          cancelPanelIcon={<CancelPanelIcon />}
          validPanelIcon={<ValidPanelIcon />}
          sortDownIcon={<SortDownIcon />}
          sortUpIcon={<SortUpIcon />}
          sortNoneIcon={<SortNoneIcon />}
          inlineActions={inlineActions}
          globalActions={globalActions}
          sort={this.props.clientType.sort}
          filters={this.props.clientType.filters}
          onSearch={this.onQuickSearch}
          onClearFilters={this.onClearFilters}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onLoadMore={this.onLoadMore}
          loadMorePending={this.props.clientType.loadMorePending}
          loadMoreFinish={this.props.clientType.loadMoreFinish}
          loadMoreError={this.props.clientType.loadMoreError}
        />
        {this.state.clitId > 0 && (
          <Modify modal={true} clitId={this.state.clitId} onClose={this.onClose} />
        )}
        {this.state.clitId === 0 && <Create modal={true} onClose={this.onClose} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clientType: state.clientType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
