import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'jsonapi-tools';
import { propagateModel } from '../../common';
import { CenteredLoading9X9, createSuccess, showErrors } from '../ui';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      family: this.props.parentFamily || null,
      itemId: 0,
      modal: this.props.modal || false,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.itemId).then(result => {
      const item = this.props.item.loadOneItem;
      this.setState({ item: item });
    });
  }

  onCancel() {
    this.props.onClose();
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    datas.family = this.state.family;
    let obj = getJsonApi(datas, 'FreeAsso_Item', this.state.itemId);
    this.props.actions
      .createOne(obj)
      .then(result => {
        this.props.actions.propagateModel('FreeAsso_Item', result);
        createSuccess();
        this.props.onClose();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, 'createOneError');
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="item-modify global-card">
        {this.props.item.loadOnePending ? (
          <CenteredLoading9X9 />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                modal={this.state.modal}
                datas={this.props.data.items}
                config={this.props.config.items}
                properties={this.props.item.properties}
                errors={this.props.item.updateOneError}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
                onClose={this.props.onClose}
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
    item: state.item,
    data: state.data,
    config: state.config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(Modify)));
