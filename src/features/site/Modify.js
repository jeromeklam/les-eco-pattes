import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading3Dots, modifySuccess, modifyError } from '../ui';

/**
 * Modification d'un site
 */
export class Modify extends Component {
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
      siteId: this.props.siteId || this.props.match.params.siteId || false,
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
    this.props.actions.loadOne(this.state.siteId).then(result => {
      const item = this.props.site.loadOneItem;
      this.setState({ item: item });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.siteId && this.props.match.params.siteId) {
      if (prevProps.match.params.siteId !== this.props.match.params.siteId) {
        this.setState({ siteId: this.props.match.params.siteId });
        this.props.actions.loadOne(this.props.match.params.siteId).then(result => {
          const item = this.props.site.loadOneItem;
          this.setState({ item: item });
        });
      }
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
    this.props.actions
      .updateOne(obj)
      .then(result => {
        // @Todo propagate result to store
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
        // @todo display errors to fields
        modifyError();
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="site-modify global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            <Form
              item={item}
              modal={this.state.modal}
              datas={this.props.data.items}
              config={this.props.config.items}
              site_types={this.props.siteType.items}
              properties={this.props.site.properties}
              errors={this.props.site.updateOneError}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify));
