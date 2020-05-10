import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading9X9, modifySuccess, modifyError } from '../ui';

/**
 * Modification d'une maladie
 */
export class Modify extends Component {
  static propTypes = {
    sickness: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    /**
     * On récupère l'id et l'élément à afficher
     */
    this.state = {
      sickId: this.props.sickId || this.props.match.params.sickId || false,
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
    this.props.actions.loadOne(this.state.sickId).then(result => {
      const item = this.props.sickness.loadOneItem;
      this.setState({ item: item });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.sickId && this.props.match.params.sickId) {
      if (prevProps.match.params.sickId !== this.props.match.params.sickId) {
        this.setState({ sickId: this.props.match.params.sickId });
        this.props.actions.loadOne(this.props.match.params.sickId).then(result => {
          const item = this.props.sickness.loadOneItem;
          this.setState({ item: item });
        });
      }
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
    let obj = getJsonApi(datas);
    this.props.actions
      .updateOne(obj)
      .then(result => {
        // @Todo propagate result to store
        // propagateModel est ajouté aux actions en bas de document
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_Sickness', result);
        this.props.onClose();
      })
      .catch(errors => {
        // @todo display errors to fields
        modifyError();
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="sickness-modify global-card">
        {this.props.sickness.loadOnePending ? (
          <CenteredLoading9X9 />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                modify
                datas={this.props.data.items}
                config={this.props.config.items}
                properties={this.props.sickness.properties}
                errors={this.props.sickness.updateOneError}
                tab={this.props.sickness.tab}
                tabs={this.props.sickness.tabs}
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
    sickness: state.sickness,
    data: state.data,
    config: state.config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify));
