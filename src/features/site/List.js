import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';
import {
  buildModel
} from '../../common';

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
        {items && items.map(item => (
          <li key={item.id}>
            <Link to={"/site/modify/" + item.id}>{item.site_name}</Link>
          </li>
        ))}
        {this.props.site.loading && <span>Loading</span> }
        {this.props.site.loaded ? <span>... OK ...</span> : <span>... MORE ...</span>}
        {this.props.site.loadMoreError && <span>Erreur lors du chargement !</span>}
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
