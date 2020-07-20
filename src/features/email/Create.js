import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { modelsToSelect } from '../../common';
import { CenteredLoading9X9, createSuccess ,showErrors } from '../ui';
import Form from './Form';

export class Create extends Component {
  static propTypes = {
    email: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
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
    this.props.actions.loadOne(this.state.id).then(result => {
      const item = this.props.email.loadOneItem;
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
    this.props.history.push('/email');
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   * Sur erreur faut afficher les messages d'anomalie
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeFW_Email', this.state.id);
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.clearItems();
        this.props.history.push('/email');
      })
      .catch(errors => {
        // @todo display errors to fields
        showErrors(this.props.intl, errors, 'createOneError');
      });
  }

  render() {
    const item = this.state.item;
    const options = modelsToSelect(this.props.lang.items, 'id', 'lang_name');
    return (
      <div className="email-create global-card">
        {this.props.email.loadOnePending ? (
          <CenteredLoading9X9 />
        ) : (
          <div>
            {item && <Form item={item} onSubmit={this.onSubmit} onCancel={this.onCancel} langs={options} />}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.email,
    lang: state.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Create));
