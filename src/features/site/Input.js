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
    site: PropTypes.object.isRequired,
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
      siteId: props.siteId || 0,
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
    this.props.actions.loadOne(this.state.siteId).then(result => {
      const item = this.props.site.loadOneItem;
      this.setState({ item: item });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.siteId !== this.props.siteId) {
      this.setState({ siteId: this.props.siteId });
      this.props.actions.loadOne(this.props.siteId).then(result => {
        const item = this.props.site.loadOneItem;
        this.setState({ item: item });
      });
    }
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel() {
    if (!this.props.modal) {
      this.props.history.push('/site');
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
    if (this.state.siteId > 0) {
      this.props.actions
        .updateOne(this.state.siteId, obj)
        .then(result => {
          // propagateModel est ajouté aux actions en bas de document
          modifySuccess();
          this.props.actions.propagateModel('FreeAsso_Site', result);
          if (!this.props.modal) {
            this.props.history.push('/site');
          } else {
            if (this.props.onClose) {
              this.props.onClose();
            }
          }
        })
        .catch(errors => {
          showErrors(this.props.intl, this.props.site.updateOneError);
        });
    } else {
      this.props.actions
        .createOne(obj)
        .then(result => {
          createSuccess();
          this.props.actions.propagateModel('FreeAsso_Site', result);
          if (!this.props.modal) {
            this.props.history.push('/site');
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
      <div className="site-input global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            <Form
              item={item}
              modify
              modal={this.state.modal}
              datas={this.props.data.items}
              config={this.props.config.items}
              site_types={this.props.siteType.items}
              properties={this.props.site.properties}
              errors={
                this.state.siteId > 0
                  ? this.props.site.updateOneError
                  : this.props.site.createOneError
              }
              tab={this.props.site.tab}
              tabs={this.props.site.tabs}
              onSubmit={this.onSubmit}
              onCancel={this.onCancel}
              onClose={this.props.onClose}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    site: state.site,
    data: state.data,
    config: state.config,
    siteType: state.siteType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Input));
