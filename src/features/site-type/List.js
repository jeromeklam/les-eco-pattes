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

export class List extends Component {
  static propTypes = {
    siteType: PropTypes.object.isRequired,
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
    this.props.history.push('/site-type/create')
  }

  render() {
    let items = false;
    if (this.props.siteType.items.FreeAsso_SiteType) {
      items = buildModel(this.props.siteType.items, 'FreeAsso_SiteType');
    }
    // L'affichage, items, loading, loadMoreError
    return (
      <div className="site-type-list">
        <div className="row site-type-list-title">
          <div className="col-26">
            <span>Types de site</span>
          </div>
          <div className="col-10 text-right">            
            <ButtonAddOne onClick={this.onCreate}/>
          </div>
        </div>
        <Mobile>
          {items && items.map(item => (
            <MobileLine item={item} />  
          ))}
        </Mobile>
        <Desktop>
          {items && items.map(item => (
            <DesktopLine item={item} />  
          ))}
          {this.props.siteType.LoadMorePending && <LoadingData /> }
          {this.props.siteType.LoadMoreFinish ? <LoadComplete /> : <LoadMore />}
          {this.props.siteType.LoadMoreError && <LoadError />}
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
