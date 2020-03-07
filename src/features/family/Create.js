import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { CenteredLoading9X9, createSuccess, createError } from '../ui';
import Form from './Form';
import { propagateModel } from '../../common';

export class Create extends Component {
  static propTypes = {
    family: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      family: this.props.parentFamily,
      famId: 0,
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
    this.props.actions.loadOne(this.state.famId).then(result => {
      const item = this.props.family.loadOneItem;
      this.setState({ item: item });
    });
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel(event) {
    this.props.onClose();
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   * Sur erreur faut afficher les messages d'anomalie
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    datas.parent = this.state.family;
    let obj = getJsonApi(datas, 'FreeAsso_Family', this.state.famId);
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.propagateModel('FreeAsso_Family', result);
        this.props.onClose();
      })
      .catch(errors => {
        // @todo display errors to fields
        createError();
      });
  }

  render() {
    const { item } = this.state;
    return (
      <div className="family-modify global-card">
        {this.props.family.loadOnePending ? (
          <CenteredLoading9X9 />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                datas={this.props.data.items}
                config={this.props.config.items}
                properties={this.props.family.properties}
                errors={this.props.family.createOneError}
                tab={this.props.family.tab}
                tabs={this.props.family.tabs}
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
    family: state.family,
    data: state.data,
    config: state.config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create));
