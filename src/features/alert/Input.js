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
    alert: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
  };
  static defaultProps = {
    loader: true,
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.objId !== state.obj_id ||
      props.objName !== state.obj_name ||
      props.object !== state.object
    ) {
      return {
        obj_id: props.objId,
        obj_name: props.objName,
        object: props.object,
        alert_id: -1,
        confirm: false,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      alertId: props.alert_id || 0,
      object: props.object,
      obj_name: props.objName,
      obj_id: props.objId,
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
    this.props.actions
      .loadOne(this.state.alertId)
      .then(result => {
        const item = this.props.alert.loadOneItem;
        if (this.state.alertId === 0) {
          item.user = this.props.user || null;
          if (this.props.params) {
            const { params } = this.props;
            if (params.alert_from) {
              item.alert_from = params.alert_from;
            }
            if (params.alert_to) {
              item.alert_to = params.alert_to;
            }
            if (params.user) {
              item.user = params.user;
            }
          }
          if (this.state.obj_name) {
            item.alert_object_name = this.state.obj_name;
          }
          if (this.state.obj_id) {
            item.alert_object_id = this.state.obj_id;
          }
          if (this.state.object) {
            item.object = this.state.object;
          }
          item.alert_task = true;
        }
        this.setState({ item: item });
      })
      .catch(error => {
        this.props.onClose();
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
    let obj = getJsonApi(datas);
    if (this.state.alertId > 0) {
      this.props.actions
        .updateOne(this.state.alertId, obj)
        .then(result => {
          modifySuccess();
          this.props.actions.propagateModel('FreeFW_Alert', result);
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
          this.props.actions.propagateModel('FreeFW_Alert', result);
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
      <div className="alert-input global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                modal={true}
                tab={this.props.alert.tab}
                tabs={this.props.alert.tabs}
                errors={
                  this.state.alertId > 0
                    ? this.props.alert.updateOneError
                    : this.props.alert.createOneError
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
    alert: state.alert,
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Input));
