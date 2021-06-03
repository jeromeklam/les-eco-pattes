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
    causeSickness: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
  };
  static defaultProps = {
    loader: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      causId: props.caus_id|| 0,
      cause: props.cause,
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
    this.props.actions.loadOne(this.state.causId).then(result => {
      const item = this.props.causeSickness.loadOneItem;
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
    datas.cause = this.state.cause; 
    let obj = getJsonApi(datas);
    if (this.state.causId > 0) {
      this.props.actions
        .updateOne(this.state.causId, obj)
        .then(result => {
          modifySuccess();
          this.props.actions.propagateModel('FreeAsso_CauseSickness', result);
          this.props.actions.loadSicknesses(this.state.cause);
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
          this.props.actions.propagateModel('FreeAsso_CauseSickness', result);
          this.props.actions.loadSicknesses(this.state.cause);
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
      <div className="cause-sickness-input global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                modal={true}
                tab_datas={this.props.data.items}
                tab_configs={this.props.config.items}
                errors={
                  this.state.causId > 0
                    ? this.props.causeSickness.updateOneError
                    : this.props.causeSickness.createOneError
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
    causeSickness: state.causeSickness,
    data: state.data,
    config: state.config, 
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Input));
