import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { getJsonApi } from 'jsonapi-tools';
import { propagateModel } from '../../common';
import { CenteredLoading3Dots, modifySuccess, showErrors} from '../ui';
import Form from './Form';


export class Modify extends Component {
  static propTypes = {
    alert: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  static defaultProps = {
    loader: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      alertId: this.props.alert_id,
      obj: this.props.obj,
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
    this.props.actions.loadOne(this.state.alertId).then(result => {
      const item = this.props.alert.loadOneItem;
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
    this.props.onClose();
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   * Sur erreur faut afficher les messages d'anomalie
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeFW_Alert', this.state.alertId);
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
  }

  render() {
    const item = this.state.item;
    console.log("FK propsalert",this.props.alert);
    return (
      <div className="alert-create global-card">
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch)
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Modify));
