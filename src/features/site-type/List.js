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
  ButtonReload
} from '../layout';
import { Desktop, Tablet, Mobile, Default } from '../common'
import { DesktopLine, MobileLine } from '.';

export class List extends Component {
  static propTypes = {
    siteType: PropTypes.object.isRequired,
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

  onCreate (event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/site-type/create')
  }

  onGetOne(id) {
    this.props.history.push('/site-type/modify/' + id) ;
  }

  onReload(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.actions.loadMore({}, true);
  }

  render() {
    let items = false;
    if (this.props.siteType.items.FreeAsso_SiteType) {
      items = buildModel(this.props.siteType.items, 'FreeAsso_SiteType');
    }
    // L'affichage, items, loading, loadMoreError
    return (
      <div className="">
        <Mobile>
          <div className="row row-list-title">
            <div className="col-20">
              <span>Types de site</span>
            </div>
            <div className="col-16 text-right">            
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
          <div className="row-list data-list">
            {items && items.map(item => (
              <MobileLine key={item.id} item={item} />  
            ))}
          </div>
          {this.props.siteType.loadMorePending ? (
              <LoadingData /> 
            ) : (
              <div>
                {this.props.siteType.loadMoreFinish ? <LoadComplete /> : <LoadMore />}
              </div>
            )
          }
          {this.props.siteType.loadMoreError && <LoadError />}
        </Mobile>
        <Desktop>
          <div className="row row-list-title">
            <div className="col-26">
              <span>Types de site</span>
            </div>
            <div className="col-10 text-right">            
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
          <div className="row-list data-list">
            {items && items.map(item => (
              <DesktopLine key={item.id} item={item} onGetOne={this.onGetOne}/>  
            ))}
          </div>
          {this.props.siteType.loadMorePending ? (
              <LoadingData /> 
            ) : (
              <div>
                {this.props.siteType.loadMoreFinish ? <LoadComplete /> : <LoadMore />}
              </div>
            )
          }
          {this.props.siteType.loadMoreError && <LoadError />}
        </Desktop>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    siteType: state.siteType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
