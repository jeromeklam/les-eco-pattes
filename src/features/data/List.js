import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { DesktopLine, MobileLine } from '.';
import {
  LoadingData,
  LoadMore,
  LoadError,
  LoadComplete,
  ButtonAddOne
} from '../layout';
import {
  buildModel
} from '../../common';
import { Desktop, Tablet, Mobile, Default } from '../common'

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
  }

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
    this.props.history.push('/data/create') ;
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
        <div className="row data-list-title">
          <div className="col-26">
            <span>Données -- divers</span>
          </div>
          <div className="col-10 text-right">            
            <ButtonAddOne onClick={this.onCreate}/>
          </div>
        </div>
        <Mobile>
          {items && items.map(item => (
            <MobileLine key={item.id} item={item} />  
          ))}
        </Mobile>
        <Desktop>
          {items && items.map(item => (
            <DesktopLine key={item.id} item={item} />  
          ))}
          {this.props.data.LoadMorePending && <LoadingData /> }
          {this.props.data.LoadMoreFinish ? <LoadComplete /> : <LoadMore />}
          {this.props.data.LoadMoreError && <LoadError />}
        </Desktop>
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
