import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { ResponsiveList } from 'react-bootstrap-front';
import {
  SimpleCancel as CancelPanelIcon,
  SimpleValid as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
} from '../icons';
import { getGlobalActions, getInlineActions, getCols } from './';
import { Create, Modify } from './';

/**
 * Liste des données
 */
export class List extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataId: -1,
      timer: null,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onClose  = this.onClose.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate() {
    this.setState({ dataId: 0 });
  }

  onGetOne(id) {
    this.setState({ dataId: id });
  }

  onClose() {
    this.setState({ dataId: -1 });
  }

  onDelOne(id) {
    // @todo
  }

  onLoadMore() {
    this.props.actions.loadMore({}, true);
  }

  onReload(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.actions.loadMore({}, true);
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

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.data.items.FreeAsso_Data) {
      items = normalizedObjectModeler(this.props.data.items, 'FreeAsso_Data');
    }
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const cols = getCols(this);
    // L'affichage, items, loading, loadMoreError
    return (
      <div>
        <ResponsiveList
          title="Variables"
          cols={cols}
          items={items}
          mainCol="data_name"
          cancelPanelIcon={<CancelPanelIcon />}
          validPanelIcon={<ValidPanelIcon />}
          sortDownIcon={<SortDownIcon />}
          sortUpIcon={<SortUpIcon />}
          sortNoneIcon={<SortNoneIcon />}
          inlineActions={inlineActions}
          globalActions={globalActions}
          sort={this.props.data.sort}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onReload={this.onReload}
          onLoadMore={this.onLoadMore}
          loadMorePending={this.props.data.loadMorePending}
          loadMoreFinish={this.props.data.loadMoreFinish}
          loadMoreError={this.props.data.loadMoreError}
        />
        {this.state.dataId > 0 && (
          <Modify modal={true} dataId={this.state.dataId} onClose={this.onClose} />
        )}
        {this.state.dataId === 0 && <Create modal={true} onClose={this.onClose} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
