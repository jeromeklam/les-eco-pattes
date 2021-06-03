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
    contract: PropTypes.object.isRequired,
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
      ctId: props.ctId || 0,
      modal: props.modal || false,
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
    this.props.actions.loadOne(this.state.ctId).then(result => {
      const item = this.props.contract.loadOneItem;
      this.setState({ item: item });
    });
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel() {
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
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas);
    if (this.state.ctId > 0) {
      this.props.actions
        .updateOne(this.state.ctId, obj)
        .then(result => {
          modifySuccess();
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
          showErrors(this.props.intl, errors, 'updateOneError');
        });
    } else {
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
  }

  render() {
    const item = this.state.item;
    return (
      <div className="contract-input global-card">
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
              errors={
                this.state.ctId > 0
                  ? this.props.contract.updateOneError
                  : this.props.contract.createOneError
              }
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
    config: state.config,
    data: state.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Input));
