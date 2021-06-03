import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { getJsonApi } from 'jsonapi-front';
import { propagateModel } from '../../common';
import { CenteredLoading3Dots, createSuccess, modifySuccess, showErrors } from '../ui';
import Form from './Form';

export class Input extends Component {
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
      clitId: props.clitId || 0,
      modal: props.modal || false,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.clitId).then(result => {
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
    let obj = getJsonApi(datas);
    if (this.state.clitId > 0) {
      this.props.actions
        .updateOne(this.state.clitId, obj)
        .then(result => {
          modifySuccess();
          this.props.actions.propagateModel('FreeAsso_ClientType', result);
          this.props.onClose();
        })
        .catch(errors => {
          showErrors(this.props.intl, errors, 'updateOneError');
        });
    } else {
      this.props.actions
        .createOne(obj)
        .then(result => {
          createSuccess();
          this.props.actions.propagateModel('FreeAsso_ClientType', result);
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
      <div className="client-type-input global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                errors={
                  this.state.clitId > 0
                    ? this.props.clientType.updateOneError
                    : this.props.clientType.createOneError
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
    clientType: state.clientType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Input));
