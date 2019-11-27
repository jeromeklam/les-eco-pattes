import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';
import {
  buildModel
} from '../../common';
import {
  LoadingData,
  LoadMore,
  LoadError,
  LoadComplete,
  ButtonAddOne
} from '../layout';
import { Desktop, Tablet, Mobile, Default } from '../common'
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
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  /**
   * Le composant est chargé 
   */
  componentDidMount() {
    /**
     *  En async on va demander le chargement des données
     *  Lorsque fini le store sera modifié
     */
    this.props.actions.loadMore();
  }

  onCreate (event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/site/create')
  }

  onLoadMore(event) {
    if (event) {
      event.preventDefault();
    }
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
    // L'affichage, items, loading, loadMoreError
    return (
      <div className="site-list">
        <div className="row site-list-title">
          <div className="col-26">
            <span>Sites</span>
          </div>
          <div className="col-10 text-right">            
            <ButtonAddOne onClick={this.onCreate}/>
          </div>
        </div>
        <Mobile>
          {items && items.map(item => (
            <MobileLine key={item.id} item={item} />  
          ))}
          {this.props.site.loadMorePending && <LoadingData /> }
          {this.props.site.loadMoreFinish ? <LoadComplete /> : <LoadMore onMore={this.onLoadMore} />}
          {this.props.site.loadMoreError && <LoadError />}
        </Mobile>
        <Desktop>
          {items && items.map(item => (
            <DesktopLine key={item.id} item={item} />  
          ))}
          {this.props.site.loadMorePending && <LoadingData /> }
          {this.props.site.loadMoreFinish ? <LoadComplete /> : <LoadMore onMore={this.onLoadMore} />}
          {this.props.site.loadMoreError && <LoadError />}
        </Desktop>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    site: state.site,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
