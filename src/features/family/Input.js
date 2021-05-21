import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { getJsonApi } from 'jsonapi-front';
import { propagateModel } from '../../common';
import { changeSetting } from '../auth/redux/actions';
import { CenteredLoading3Dots, createSuccess, modifySuccess, showErrors } from '../ui';
import Form from './Form';

export class Input extends Component {
  static propTypes = {
    family: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
  };
  static defaultProps = {
    loader: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      famId: this.props.famId || 0,
      modal: props.modal || false,
      family: props.parentFamily,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.famId).then(result => {
      const item = this.props.family.loadOneItem;
      this.setState({ item: item });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.famId !== this.props.famId) {
      this.setState({ famId: this.props.famId });
      this.props.actions.loadOne(this.props.famId).then(result => {
        const item = this.props.family.loadOneItem;
        this.setState({ item: item });
      });
    }
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel() {
    this.props.onClose();
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   * Sur erreur faut afficher les messages d'anomalie
   */
  onSubmit(datas) {
    // Conversion des données en objet pour le service web
    datas.parent = this.state.family;
    let obj = getJsonApi(datas);
    if (this.state.famId > 0) {
      this.props.actions
        .updateOne(this.state.famId, obj)
        .then(result => {
          modifySuccess();
          this.props.actions.propagateModel('FreeAsso_Family', result);
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
          this.props.actions.propagateModel('FreeAsso_Family', result);
          this.props.onClose();
        })
        .catch(errors => {
          showErrors(this.props.intl, errors, 'createOneError');
        });
    }
  }

  render() {
    const { item } = this.state;
    return (
      <div className="family-input global-card">
        {this.props.family.loadOnePending ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                datas={this.props.data.items}
                config={this.props.config.items}
                properties={this.props.family.properties}
                errors={
                  this.state.famId > 0
                    ? this.props.family.updateOneError
                    : this.props.family.createOneError
                }
                tab={this.props.family.tab}
                tabs={this.props.family.tabs}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
                onClose={this.props.onClose}
                modal
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
    family: state.family,
    data: state.data,
    config: state.config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Input));
