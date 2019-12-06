import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from '../../common';
import {
  ResponsiveList
} from '../common';

export class List extends Component {
  static propTypes = {
    clientCategory: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/client-category/create');
  }

  onGetOne(id) {
    this.props.history.push('/client-category/modify/' + id);
  }

  onDelOne(id) {
    this.props.actions.delOne(id).then(result => this.props.actions.loadMore({}, true));
  }

  onReload(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.actions.loadMore({}, true);
  }

  onQuickSearch(quickSearch) {
    this.props.actions.loadMore(quickSearch, true);
  }

  onLoadMore(event) {
    this.props.actions.loadMore();
  }

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = false;
    if (this.props.clientCategory.items.FreeAsso_ClientCategory) {
      items = buildModel(this.props.clientCategory.items, 'FreeAsso_ClientCategory');
    }
    const cols = [
      {
        name: 'clic_name',
        label: 'Nom',
        col: 'clic_name',
        size: '30',
        mob_size: '36',
        title: false,
      }
    ];
    // L'affichage, items, loading, loadMoreError
    return (
      <ResponsiveList
        title="Catégories de client"
        titleSearch="Recherche nom"
        cols={cols}
        items={items}
        onSearch={this.onQuickSearch}
        onReload={this.onReload}
        onCreate={this.onCreate}
        onGetOne={this.onGetOne}
        onDelOne={this.onDelOne}
        mainCol="clic_name"
        loadMorePending={this.props.clientCategory.loadMorePending}
        loadMoreFinish={this.props.clientCategory.loadMoreFinish}
        loadMoreError={this.props.clientCategory.loadMoreError}
        onLoadMore={this.onLoadMore}
      />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    clientCategory: state.clientCategory,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
