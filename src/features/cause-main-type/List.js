import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from '../../common';
import {
  ResponsiveList,
} from '../common';

export class List extends Component {
  static propTypes = {
    causeMainType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);  
    this.onLoadMore = this.onLoadMore.bind(this);  
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/cause-main-type/create');
  }

  onGetOne(id) {
    this.props.history.push('/cause-main-type/modify/' + id);
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

  onLoadMore(event) {
    this.props.actions.loadMore();
  }

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.causeMainType.items.FreeAsso_CauseMainType) {
      items = buildModel(this.props.causeMainType.items, 'FreeAsso_CauseMainType');
    }
    const cols = [
      { name: "name", label: "Nom", col: "camt_name", size:"30", mob_size:"", title: true}
    ];
    return (
      <ResponsiveList
        title="Espèces"
        titleSearch="Recherche nom"
        cols={cols}
        items={items}
        onSearch={this.onQuickSearch}
        onReload={this.onReload}
        onCreate={this.onCreate}
        onGetOne={this.onGetOne}
        onDelOne={this.onDelOne}
        mainCol="camt_name"
        loadMorePending={this.props.causeMainType.loadMorePending}
        loadMoreFinish={this.props.causeMainType.loadMoreFinish}
        loadMoreError={this.props.causeMainType.loadMoreError}
        onLoadMore={this.onLoadMore}
      />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    causeMainType: state.causeMainType,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
