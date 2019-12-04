import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from '../../common';
import {
  ResponsiveListHeader,
  ResponsiveListLines,
  ResponsiveListFooter,
  DesktopListTitle,
  DesktopListLine,
  MobileListLine,
  Desktop,
  Mobile,
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
      { name: 'firstname',    label: 'Prénom', col: 'cli_firstname',     size: '8',  mob_size: '',   title: true },
      { name: 'lastname', label: 'Nom',  col: 'cli_lastname', size: '10', mob_size: '36', title: false },
    ];
    // L'affichage, items, loading, loadMoreError
    return (
      <div className="responsive-list">
        <ResponsiveListHeader
          title="Personnes"
          labelSearch="Recherche nom"
          onQuickSearch={this.onQuickSearch}
          onReload={this.onReload}
          onCreate={this.onCreate}
        />
        <Desktop>
          <DesktopListTitle cols={cols} />
        </Desktop>
        <ResponsiveListLines>
          {items &&
            items.map(item => {
              return (
                <div key={item.id}>
                  <Mobile>
                    <MobileListLine                      
                      id={item.id}
                      item={item}
                      title={item.cli_firstname}
                      onGetOne={this.onGetOne}
                      onDelOne={this.onDelOne}
                      lines={cols}
                    />
                  </Mobile>
                  <Desktop>
                    <DesktopListLine
                      id={item.id}
                      item={item}
                      onGetOne={this.onGetOne}
                      onDelOne={this.onDelOne}
                      cols={cols}
                    />
                  </Desktop>
                </div>
              );
            })}
        </ResponsiveListLines>
        <ResponsiveListFooter
          loadMorePending={this.props.client.loadMorePending}
          loadMoreFinish={this.props.client.loadMoreFinish}
          loadMoreError={this.props.client.loadMoreError}
          onLoadMore={this.onLoadMore}
        />
      </div>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
