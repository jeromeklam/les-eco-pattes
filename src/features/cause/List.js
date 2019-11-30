import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate (event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/cause/create');
  }

  onGetOne(id) {
    this.props.history.push('/cause/modify/' + id) ;
  }

  onReload(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.actions.loadMore({}, true);
  }

  render() {
    // Les des items à afficher avec remplissage progressif
    let items = false;
    if (this.props.cause.items.FreeAsso_Cause) {
      items = buildModel(this.props.cause.items, 'FreeAsso_Cause');
    }
    // L'affichage, items, loading, loadMoreError
    return (
      <div className="cause-list">
        <div className="row row-list-title">
          <div className="col-26">
            <span>Animaux</span>
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
        <Mobile>
          {items && items.map(item => (
            <MobileLine key={item.id} item={item} />  
          ))}
          {this.props.cause.loadMorePending ? (
              <LoadingData /> 
            ) : (
              <div>
                {this.props.cause.loadMoreFinish ? <LoadComplete /> : <LoadMore />}
              </div>
            )
          }
          {this.props.cause.loadMoreError && <LoadError />}
        </Mobile>
        <Desktop>
          <div className="row-list data-list">
            {items && items.map(item => (
              <DesktopLine key={item.id} item={item} onGetOne={this.onGetOne}/>  
            ))}
          </div>
          {this.props.cause.loadMorePending ? (
              <LoadingData /> 
            ) : (
              <div>
                {this.props.cause.loadMoreFinish ? <LoadComplete /> : <LoadMore />}
              </div>
            )
          }
          {this.props.cause.loadMoreError && <LoadError />}
        </Desktop>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cause: state.cause,
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
