import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading9X9, modifySuccess, showErrors } from '../ui';

/**
 * Modification d'un movement
 */
export class Modify extends Component {
  static propTypes = {
    movement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    /**
     * On récupère l'id et l'élément à afficher
     */
    this.state = {
      movementId: this.props.movementId || this.props.match.params.movementId || false,
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
    this.props.actions.loadOne(this.state.movementId).then(result => {
      const item = this.props.movement.loadOneItem;
      this.setState({ item: item });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.movementId && this.props.match.params.movementId) {
      if (prevProps.match.params.movementId !== this.props.match.params.movementId) {
        this.setState({ movementId: this.props.match.params.movementId });
        this.props.actions.loadOne(this.props.match.params.movementId).then(result => {
          const item = this.props.movement.loadOneItem;
          this.setState({ item: item });
        });
      }
    }
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel() {
    if (!this.props.modal) {
      this.props.history.push('/movement');
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
  onSubmit(datas) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas);
    this.props.actions
      .updateOne(obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_Movement', result);
        if (!this.props.modal) {
          this.props.history.push('/movement');
        } else {
          if (this.props.onClose) {
            this.props.onClose();
          }
        }
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, 'updateOneError');
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="movement-modify global-card">
        {this.props.movement.loadOnePending ? (
          <CenteredLoading9X9 />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                modify={true}
                modal={this.state.modal}
                datas={this.props.data.items}
                config={this.props.config.items}
                properties={this.props.movement.properties}
                errors={this.props.movement.updateOneError}
                tab={this.props.movement.tab}
                tabs={this.props.movement.tabs}
                cause_types={this.props.causeType.items}
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
    movement: state.movement,
    data: state.data,
    config: state.config,
    causeType: state.causeType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify));
