import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';
import {
  buildModel
} from '../../common';


export class List extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.loadMore();
  }

  render() {
    let items = false;
    if (this.props.cause.items.FreeAsso_Cause) {
      items = buildModel(this.props.cause.items, 'FreeAsso_Cause');
    }
    // L'affichage, items, loading, loadMoreError
    return (
      <div className="cause-list">
        {items && items.map(item => (          
          <li key={item.id}>
            <Link to={"/cause/modify/" + item.id}>{item.cau_name}</Link>

          </li>
        ))}
        {this.props.cause.loading && <span>Loading</span> }
        {this.props.cause.loaded ? <span>... OK ...</span> : <span>... MORE ...</span>}
        {this.props.cause.loadMoreError && <span>Erreur lors du chargement !</span>}
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
