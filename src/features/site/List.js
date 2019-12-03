import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';
import { buildModel } from '../../common';
import {
  LoadingData,
  LoadMore,
  LoadError,
  LoadComplete,
  ButtonAddOne,
  ButtonReload,
  InputQuickSearch,
} from '../layout';
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
import { DesktopLine, MobileLine } from '.';

/**
 * Liste des sites
 */
export class List extends Component {
  /**
   * Y'a quoi dans this.props ?
   */
  static propTypes = {
    site: PropTypes.object.isRequired,
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
    this.props.history.push('/site/create');
  }

  onGetOne(id) {
    this.props.history.push('/site/modify/' + id);
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

  /**
   * Génération du contenu
   */
  render() {
    // Les des items à afficher avec remplissage progressif
    let items = false;
    if (this.props.site.items.FreeAsso_Site) {
      items = buildModel(this.props.site.items, 'FreeAsso_Site');
    }
    const cols = [
      { name: 'name',    label: 'Nom site', col: 'site_name',     size: '8',  mob_size: '',   title: true },
      { name: 'address', label: 'Adresse',  col: 'site_address1', size: '10', mob_size: '36', title: false },
      { name: 'cp',      label: 'CP',       col: 'site_cp',       size: '2',  mob_size: '10', title: false },
      { name: 'town',    label: 'Commune',  col: 'site_town',     size: '10', mob_size: '26', title: false },
    ];
    // L'affichage, items, loading, loadMoreError
    return (
      <div className="responsive-list">
        <ResponsiveListHeader
          title="Sites"
          labelSearch="Recherche nom du site"
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
                      title={item.site_name}
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
          loadMorePending={this.props.site.loadMorePending}
          loadMoreFinish={this.props.site.loadMoreFinish}
          loadMoreError={this.props.site.loadMoreError}
          onLoadMore={this.onLoadMore}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    site: state.site,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
