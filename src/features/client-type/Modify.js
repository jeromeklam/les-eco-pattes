import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading9X9, modifySuccess, modifyError } from '../ui';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    clientType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      clientTypeId: this.props.match.params.id || false,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.clientTypeId).then(result => {
      const item = this.props.clientType.loadOneItem;
      this.setState({ item: item });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.clientTypeId && this.props.match.params.clientTypeId) {
      if (prevProps.match.params.clientTypeId !== this.props.match.params.clientTypeId) {
        this.setState({ clientTypeId: this.props.match.params.clientTypeId });
        this.props.actions.loadOne(this.props.match.params.clientTypeId).then(result => {
          const item = this.props.clientType.loadOneItem;
          this.setState({ item: item });
        });
      }
    }
  }

  onCancel() {
    this.props.history.push('/client-type');
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeAsso_ClientType', this.state.clientTypeId);
    this.props.actions
      .updateOne(obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_ClientType', result);
        this.props.history.push('/client-type');
      })
      .catch(errors => {
        modifyError();
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="client-type-modify global-card">
        {this.props.clientType.loadOnePending ? (
          <CenteredLoading9X9 />
        ) : (
          <div>
            {item && (
              <Form 
                item={item} 
                datas={this.props.data.items}
                config={this.props.config.items}
                properties={this.props.clientType.properties}
                errors={this.props.clientType.updateOneError}
                onSubmit={this.onSubmit} 
                onCancel={this.onCancel} 
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clientType: state.clientType,
    data: state.data,
    config: state.config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Modify));
