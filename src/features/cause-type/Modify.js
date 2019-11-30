import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi, propagateModel, modelsToSelect } from '../../common';
import { LoadingData } from '../layout';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    causeType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id || false,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.id).then(result => {
      const item = this.props.causeType.loadOneItem;
      this.setState({ item: item });
    });
  }

  onCancel(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/cause-type');
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeAsso_CauseType', this.state.dataId);
    this.props.actions
      .updateOne(obj)
      .then(result => {
        // @Todo propagate result to store
        // propagateModel est ajouté aux actions en bas de document
        this.props.actions.propagateModel('FreeAsso_CauseType', result);
        this.props.history.push('/cause-type');
      })
      .catch(errors => {
        // @todo display errors to fields
        console.log(errors);
      });
  }

  render() {
    const item = this.state.item;
    const options = modelsToSelect(this.props.causeMainType.items, 'id', 'camt_name');
    return (
      <div className="cause-type-modify global-card">
        {this.props.causeType.loadOnePending ? (
          <LoadingData />
        ) : (
          <div>
            {item && <Form item={item} onSubmit={this.onSubmit} onCancel={this.onCancel} causeMainType={options} />}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    causeMainType: state.causeMainType,
    causeType: state.causeType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify));
