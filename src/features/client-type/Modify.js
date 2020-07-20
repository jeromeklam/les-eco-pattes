import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading3Dots, modifySuccess, showErrors } from '../ui';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    clientType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
  };
  static defaultProps = {
    loader: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.clitId || this.props.match.params.id || false,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.id).then(result => {
      const item = this.props.clientType.loadOneItem;
      this.setState({ item: item });
    });
  }

  onCancel(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeAsso_ClientType', this.state.id);
    this.props.actions
      .updateOne(this.state.id, obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_ClientType', result);
        this.props.onClose();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, 'updateOneError');
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="client-type-modify global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            {item && 
              <Form 
                item={item} 
                errors={this.props.clientType.updateOneError}
                onSubmit={this.onSubmit} 
                onCancel={this.onCancel} 
                onClose={this.props.onClose}
              />
            }
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clientType: state.clientType,
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
