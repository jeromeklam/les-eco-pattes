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
    cause: PropTypes.object.isRequired,
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
    this.props.history.push('/cause/create')
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
        <div className="row cause-list-title">
          <div className="col-26">
            <span>Animaux</span>
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
          {this.props.cause.LoadMorePending && <LoadingData /> }
          {this.props.cause.LoadMoreFinish ? <LoadComplete /> : <LoadMore />}
          {this.props.cause.LoadMoreError && <LoadError />}
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
