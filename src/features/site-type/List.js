import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {
  buildModel
} from '../../common';
import { Link } from 'react-router-dom';


export class List extends Component {
  static propTypes = {
    siteType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.loadMore();
  }

  render() {
    let items = false;    
    if (this.props.siteType.items.FreeAsso_SiteType) {
      items = buildModel(this.props.siteType.items, 'FreeAsso_SiteType');
    }
    return (
      <div className="site-type-list">
        {items && items.map(item => (    
          <li>
            <Link to={"/site-type/modify/" + item.id}>            
              {item.sitt_name}                     
            </Link>
          </li> 
        ))}
        {this.props.siteType.loadMorePending && <span>Chargement</span> }
        {this.props.siteType.loadMoreFinish ? <span>... OK ...</span> : <span>... MORE ...</span>}
        {this.props.siteType.loadMoreError && <span>Erreur lors du chargement !</span>}
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
