import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { getJsonApi } from 'jsonapi-tools';
import { propagateModel } from '../../common';
import { CenteredLoading3Dots, createSuccess, showErrors } from '../ui';
import Form from './Form';

export class Create extends Component {
  static propTypes = {
    contract: PropTypes.object.isRequired,
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
      const item = this.props.contract.loadOneItem;
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
      this.props.history.push('/contract');
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
    let obj = getJsonApi(datas, 'FreeAsso_Contract', this.state.id);
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.propagateModel('FreeAsso_Contract', result);
        if (!this.state.modal) {
          this.props.history.push('/contract');
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
      <div className="contract-create global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            <Form
              item={item}
              tab_datas={this.props.data.items}
              tab_configs={this.props.config.items}
              modal={this.state.modal}
              tab={this.props.contract.tab}
              tabs={this.props.contract.tabs}
              errors={this.props.contract.createOneError}
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
    contract: state.contract,
    data: state.data,
    config: state.config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch)
  };
}

export default injectIntl(connect(mapStateToProps,mapDispatchToProps)(Create));
