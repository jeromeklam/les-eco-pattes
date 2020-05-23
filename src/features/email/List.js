import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from 'freejsonapi';
import { ResponsiveList } from 'freeassofront';

export class List extends Component {
  static propTypes = {
    email: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/email/create');
  }

  onGetOne(id) {
    this.props.history.push('/email/modify/' + id);
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
    let items = false;
    if (this.props.email.items.FreeFW_Email) {
      items = buildModel(this.props.email.items, 'FreeFW_Email');
    }
    const cols = [
      {
        name: 'subject',
        label: 'Sujet',
        col: 'email_subject',
        size: '20',
        mob_size: '',
        title: true,
      },
      { name: 'code', label: 'Code', col: 'email_code', size: '10', mob_size: '' },
    ];
    return (
      <ResponsiveList
        title="Email"
        titleSearch="Recherche sujet"
        cols={cols}
        items={items}
        onSearch={this.onQuickSearch}
        onReload={this.onReload}
        onCreate={this.onCreate}
        onGetOne={this.onGetOne}
        onDelOne={this.onDelOne}
        mainCol="email_subject"
        loadMorePending={this.props.email.loadMorePending}
        loadMoreFinish={this.props.email.loadMoreFinish}
        loadMoreError={this.props.email.loadMoreError}
        onLoadMore={this.onLoadMore}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.email,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
