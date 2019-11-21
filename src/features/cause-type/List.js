import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {
  buildModel
} from '../../common';
import { 
  ButtonAdd
} from '../layout';

import { Link } from 'react-router-dom';

export class List extends Component {
  static propTypes = {
    causeType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
  }    

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onAdd(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/cause-type/modify/' + 0);
  }

  render() {
    let items = false;    
    if (this.props.causeType.items.FreeAsso_CauseType) {
      items = buildModel(this.props.causeType.items, 'FreeAsso_CauseType');
    }
    // L'affichage, items, loading, loadMoreError
    return (
      <div className="cause-type-list">
        {items && items.map(item => (    
          <li>
            <Link to={"/cause-type/modify/" + item.id}>
              {item.caut_name}                     
            </Link>
          </li> 
        ))}
        {this.props.causeType.loadMorePending && <span>Chargement</span> }
        {this.props.causeType.loadMoreFinish ? <span></span> : <span>... MORE ...</span>}
        {this.props.causeType.loadMoreError && <span>Erreur lors du chargement !</span>}
        <ButtonAdd onClick={this.onAdd}/>
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
