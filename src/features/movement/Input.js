import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { getJsonApi } from 'jsonapi-front';
import { propagateModel } from '../../common';
import { getCauses } from '../cause';
import { CenteredLoading9X9, createSuccess, modifySuccess, showErrors } from '../ui';
import Form from './Form';

export class Input extends Component {
  static propTypes = {
    movement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
    selected: PropTypes.element,
  };
  static defaultProps = {
    loader: true,
    selected: [],
  };

  constructor(props) {
    super(props);
    /**
     * On récupère l'id et l'élément à afficher
     */
    this.state = {
      movementId: props.move_id || 0,
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
      if (Array.isArray(this.props.selected) && this.props.selected.length > 0) {
        getCauses('list', null, null, this.props.selected).then(result => {
          item.causes = result;
          this.setState({ item: item, loading: false });
        });
      } else {
        this.setState({ item: item, loading: false });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.move_id !== this.props.move_id) {
      this.setState({ movementId: this.props.move_id });
      this.props.actions.loadOne(this.props.move_id).then(result => {
        const item = this.props.movement.loadOneItem;
        this.setState({ item: item });
      });
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
    if (this.state.movementId > 0) {
      this.props.actions
        .updateOne(this.state.movementId, obj)
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
    } else {
      this.props.actions
        .createOne(obj)
        .then(result => {
          createSuccess();
          this.props.actions.propagateModel('FreeAsso_Movement', result);
          //this.props.actions.clearItems();
          if (!this.props.modal) {
            this.props.history.push('/movement');
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
      <div className="movement-input global-card">
        {this.props.movement.loadOnePending ? (
          <CenteredLoading9X9 />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                modify={this.props.move_id > 0}
                modal={true}
                mode={this.props.mode}
                fromSite={this.props.site}
                datas={this.props.data.items}
                config={this.props.config.items}
                properties={this.props.movement.properties}
                errors={
                  this.state.movementId > 0
                    ? this.props.movement.updateOneError
                    : this.props.movement.createOneError
                }
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

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Input),
);
