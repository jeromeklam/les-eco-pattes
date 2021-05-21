import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { getJsonApi } from 'jsonapi-front';
import { propagateModel } from '../../common';
import { CenteredLoading9X9, createSuccess, modifySuccess, showErrors } from '../ui';
import Form from './Form';

export class Input extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      family: this.props.parentFamily || null,
      itemId: this.props.itemId || 0,
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.itemId !== this.props.itemId) {
      this.setState({ itemId: this.props.itemId });
      this.props.actions.loadOne(this.props.itemId).then(result => {
        const item = this.props.item.loadOneItem;
        this.setState({ item: item });
      });
    }
  }

  onCancel() {
    if (!this.props.modal) {
      this.props.history.push('/item');
    } else {
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas);
    if (this.state.itemId > 0) {
      this.props.actions
        .updateOne(this.state.itemId , obj)
        .then(result => {
          modifySuccess();
          this.props.actions.propagateModel('FreeAsso_Item', result);
          if (!this.props.modal) {
            this.props.history.push('/item');
          } else {
            if (this.props.onClose) {
              this.props.onClose();
            }
          }
        })
        .catch(errors => {
          showErrors(this.props.intl, errors, 'updateOneError');
        });
    } else {
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
  }

  render() {
    const item = this.state.item;
    return (
      <div className="item-input global-card">
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
                errors={
                  this.state.itemId > 0
                    ? this.props.item.updateOneError
                    : this.props.item.createOneError
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(Input);
