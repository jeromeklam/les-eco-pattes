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
  ButtonAddOne
} from '../layout';
import { Desktop, Tablet, Mobile, Default } from '../common'
import { DesktopLine, MobileLine } from '.';

export class List extends Component {
  static propTypes = {
    causeType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate (event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/cause-type/create')
  }

  render() {
    let items = false;    
    if (this.props.causeType.items.FreeAsso_CauseType) {
      items = buildModel(this.props.causeType.items, 'FreeAsso_CauseType');
    }
    // L'affichage, items, loading, loadMoreError
    return (
      <div className="cause-type-list">        
        <div className="row cause-type-list-title">
          <div className="col-26">
            <span>Données -- Type d'animaux</span>
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
          {this.props.causeType.LoadMorePending && <LoadingData /> }
          {this.props.causeType.LoadMoreFinish ? <LoadComplete /> : <LoadMore />}
          {this.props.causeType.LoadMoreError && <LoadError />}
        </Desktop>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    causeType: state.causeType,
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
