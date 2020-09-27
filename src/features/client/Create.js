import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { getJsonApi, jsonApiNormalizer, normalizedObjectFirstModel } from 'jsonapi-tools';
import { propagateModel } from '../../common';
import { CenteredLoading3Dots, createSuccess, showErrors } from '../ui';
import Form from './Form';

export class Create extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      item: false,
      modal: this.props.modal || false,
    };
    /**
     * Bind des méthodes locales au contexte courant
     */
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    /**
     *  En async on va demander le chargement des données
     *  Lorsque fini le store sera modifié
     */
    this.props.actions.loadOne(this.state.id).then(result => {
      const item = this.props.client.loadOneItem;
      this.setState({ item: item });
    });
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel(event) {
    if (event) {
      event.preventDefault();
    }
    if (!this.state.modal) {
      this.props.history.push('/client');
    } else {
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   * Sur erreur faut afficher les messages d'anomalie
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeAsso_Client', this.state.id);
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.propagateModel('FreeAsso_Client', result);
        if (this.props.onCreate) {
          const lines = jsonApiNormalizer(result.data);
          const item = normalizedObjectFirstModel(lines, 'FreeAsso_Client');
          this.props.onCreate(item);
        }
        if (!this.state.modal) {
          this.props.history.push('/client');
        } else {
          if (this.props.onClose) {
            this.props.onClose();
          }
        }
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, 'createOneError');
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="client-create global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            <Form
              item={item}
              modal={this.state.modal}
              client_types={this.props.clientType.items}
              client_categories={this.props.clientCategory.items}
              errors={this.props.client.createOneError}
              countries={this.props.country.items}
              languages={this.props.lang.items}
              tab={this.props.client.tab}
              tabs={this.props.client.tabs}
              onSubmit={this.onSubmit}
              onCancel={this.onCancel}
              onClose={this.props.onClose}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.client,
    clientType: state.clientType,
    clientCategory: state.clientCategory,
    country: state.country,
    lang: state.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Create));
