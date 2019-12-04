import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from '../../common';
import {
  ResponsiveList,
} from '../common';
import { dataTypes } from './functions';

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
    this.onCreate = this.onCreate.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
  }

  componentDidMount() {
    /**
     *  En async on va demander le chargement des données
     *  Lorsque fini le store sera modifié
     */
    this.props.actions.loadMore();
  }

  onCreate(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/data/create');
  }

  onGetOne(id) {
    this.props.history.push('/data/modify/' + id);
  }

  onReload(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.actions.loadMore({}, true);
  }

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = false;
    if (this.props.data.items.FreeAsso_Data) {
      items = buildModel(this.props.data.items, 'FreeAsso_Data');
    }
    const cols = [
      { name: 'name', label: 'Nom', size: "20", col: 'data_name', title: true },
      { name: 'type', label: 'Type', size: "10", col: 'data_type', type: "switch", values: dataTypes() },
    ];
    // L'affichage, items, loading, loadMoreError
    return (
      <ResponsiveList
        title="Variables"
        titleSearch="Recherche nom"
        cols={cols}
        items={items}
        onSearch={this.onQuickSearch}
        onReload={this.onReload}
        onCreate={this.onCreate}
        onGetOne={this.onGetOne}
        onDelOne={this.onDelOne}
        mainCol="data_name"
        loadMorePending={this.props.data.loadMorePending}
        loadMoreFinish={this.props.data.loadMoreFinish}
        loadMoreError={this.props.data.loadMoreError}
        onLoadMore={this.onLoadMore}
      />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    data: state.data,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
