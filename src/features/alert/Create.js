import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading3Dots, createSuccess, showErrors } from '../ui';
import Form from './Form';

export class Create extends Component {
  static propTypes = {
    alert: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

    constructor(props) {
    super(props);
    this.state = {
      alertId: 0,
      obj_name: this.props.objName,
      obj_id: this.props.objId,
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
    //console.log("FK cDM", this.state.alertId);
    this.props.actions.loadOne(this.state.alertId).then(result => {
      const item = this.props.alert.loadOneItem;
      this.setState({ item: item });
      //console.log("FK cDM 2", item)
    });
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   * Sur erreur faut afficher les messages d'anomalie
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    datas.user = this.props.user;
    datas.alert_object_name = this.state.obj_name; 
    datas.alert_object_id = this.state.obj_id;
    console.log("FK datas", datas);
    let obj = getJsonApi(datas, 'FreeFW_Alert', this.state.alertId);
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.propagateModel('FreeFW_Alert', result);
        this.props.onClose();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, 'createOneError');
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="alert-create global-card">
        {this.props.alert.loadOnePending ? (
          <CenteredLoading3Dots />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                modal={true}
                errors={this.props.alert.createOneError}
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
    alert: state.alert,
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch)
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Create));
