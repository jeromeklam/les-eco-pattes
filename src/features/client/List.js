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
    client: PropTypes.object.isRequired,
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
    this.props.history.push('/client/create');
  }

  onGetOne(id) {
    this.props.history.push('/client/modify/' + id);
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
    if (this.props.client.items.FreeAsso_Client) {
      items = buildModel(this.props.client.items, 'FreeAsso_Client');
    }
    const cols = [
      {
        name: 'lastname',
        label: 'Nom',
        col: 'cli_lastname',
        size: '10',
        mob_size: '36',
        title: false,
      },

      {
        name: 'firstname',
        label: 'Prénom',
        col: 'cli_firstname',
        size: '8',
        mob_size: '',
        title: true,
      },
    ];
    // L'affichage, items, loading, loadMoreError
    return (
      <ResponsiveList
        title="Personnes"
        titleSearch="Recherche nom"
        cols={cols}
        items={items}
        onSearch={this.onQuickSearch}
        onReload={this.onReload}
        onCreate={this.onCreate}
        onGetOne={this.onGetOne}
        onDelOne={this.onDelOne}
        mainCol="cli_firstname"
        loadMorePending={this.props.client.loadMorePending}
        loadMoreFinish={this.props.client.loadMoreFinish}
        loadMoreError={this.props.client.loadMoreError}
        onLoadMore={this.onLoadMore}
      />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    client: state.client,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
