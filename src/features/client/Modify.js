import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { changeSetting } from '../auth/redux/actions'
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading3Dots, modifySuccess, showErrors } from '../ui';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
  };
  static defaultProps = {
    loader: true,
  };

  constructor(props) {
    super(props);
    /**
     * On récupère l'id et l'élément à afficher
     */
    this.state = {
      clientId: this.props.cliId || this.props.match.params.clientId || false,
      modal: this.props.modal || false,
      item: false,
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
    this.props.actions.loadOne(this.state.clientId).then(result => {
      const item = this.props.client.loadOneItem;
      this.setState({ item: item });
    });
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel() {
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
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeAsso_Client', this.state.clientId);
    this.props.actions
      .updateOne(this.state.clientId, obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_Client', result);
        if (!this.state.modal) {
          this.props.history.push('/client');
        } else {
          if (this.props.onClose) {
            this.props.onClose();
          }
        }
        try {
          this.props.actions.changeSetting(
            'client',
            'default',
            {
              category: datas.client_category && datas.client_category.id || null,
              type: datas.client_type && datas.client_type.id || null
            }
          );
        } catch (ex) {
          console.log(ex);
        }
      })
      .catch(errors => {
        showErrors(this.props.intl, errors);
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="client-modify global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            <Form
              item={item}
              modal={this.state.modal}
              client_types={this.props.clientType.items}
              client_categories={this.props.clientCategory.items}
              errors={this.props.client.updateOneError}
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
    actions: bindActionCreators({ ...actions, propagateModel, changeSetting }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Modify));
