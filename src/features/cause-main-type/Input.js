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
    causeMainType: PropTypes.object.isRequired,
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
      camtId: props.camtId || 0,
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
    this.props.actions.loadOne(this.state.camtId).then(result => {
      const item = this.props.causeMainType.loadOneItem;
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
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas);
    if (this.state.camtId > 0) {
    this.props.actions
      .updateOne(this.state.camtId, obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_CauseMainType', result);
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
        this.props.actions.propagateModel('FreeAsso_CauseMainType', result);
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
      <div className="cause-main-type-input global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                errors={
                  this.state.camtId > 0
                    ? this.props.causeMainType.updateOneError
                    : this.props.causeMainType.createOneError
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
    causeMainType: state.causeMainType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Input));
