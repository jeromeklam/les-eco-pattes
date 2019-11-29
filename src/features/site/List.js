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
  ButtonAddOne,
  ButtonReload,
  InputQuickSearch
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
    this.state = {
      quickSearch: "",
      mobileQuickSearch: false
    };
    this.onCreate = this.onCreate.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
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

  onGetOne(id) {
    this.props.history.push('/site/modify/' + id) ;
  }

  onReload(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.actions.loadMore({}, true);
  }

  onQuickSearch(event) {    
    if (this.state.quickSearch === "") {
      this.setState({mobileQuickSearch: !this.state.mobileQuickSearch});
    } else {  
      this.props.actions.loadMore(this.state.quickSearch, true);
    }
  }

  onChangeSearch(event) {
    this.setState({[event.target.name]: event.target.value});
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
        <div className="row row-list-title">
          <div className="col-20">
            <span>Sites</span>
          </div>
          <div className="col-10">            
            <InputQuickSearch 
              name="quickSearch"
              quickSearch={this.state.quickSearch}  
              mobileQuickSearch={this.state.mobileQuickSearch}  
              onClick={this.onQuickSearch}
              onChange={this.onChangeSearch}
            />      
          </div>          
          <div className="col-6 text-right">       
            <ul className="nav justify-content-end">         
              <li className="nav-item">
                <ButtonReload color="white" onClick={this.onReload}/>
              </li>
              <li className="nav-item">
                <ButtonAddOne color="white" onClick={this.onCreate}/>
              </li>
            </ul>     
          </div>
        </div>
        <Mobile>
          {items && items.map(item => (
            <MobileLine key={item.id} item={item} />  
          ))}
          {this.props.site.loadMorePending ? (
              <LoadingData /> 
            ) : (
              <div>
                {this.props.site.loadMoreFinish ? <LoadComplete /> : <LoadMore />}
              </div>
            )
          }
          {this.props.site.loadMoreError && <LoadError />}
        </Mobile>
        <Desktop>
          <div className="row-list data-list">
            {items && items.map(item => (
              <DesktopLine key={item.id} item={item} onGetOne={this.onGetOne}/>  
            ))}
          </div>
          {this.props.site.loadMorePending ? (
              <LoadingData /> 
            ) : (
              <div>
                {this.props.site.loadMoreFinish ? <LoadComplete /> : <LoadMore />}
              </div>
            )
          }
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
