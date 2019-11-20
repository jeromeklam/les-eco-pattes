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
 * Liste des données
 */
export class List extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    /**
     *  En async on va demander le chargement des données
     *  Lorsque fini le store sera modifié
     */
    this.props.actions.loadMore();
  }


  render() {
    // Les des items à afficher avec remplissage progressif
    let items = false;
    if (this.props.data.items.FreeAsso_Data) {
      items = buildModel(this.props.data.items, 'FreeAsso_Data');
    }
    // L'affichage, items, loading, loadMoreError
    return (
      <div className="data-list">
        {items && items.map(item => (
          <li key={item.id}>
            <Link to={"/data/modify/" + item.id}>{item.data_name}</Link>
          </li>
        ))}
        {this.props.data.loading && <span>Loading</span> }
        {this.props.data.loaded ? <span>... OK ...</span> : <span>... MORE ...</span>}
        {this.props.data.loadMoreError && <span>Erreur lors du chargement !</span>}
      </div>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
