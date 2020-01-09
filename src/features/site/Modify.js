import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { Loading9x9 } from 'freeassofront';
import cogoToast from 'cogo-toast';

/**
 * Modification d'un site
 */
export class Modify extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    /**
     * On récupère l'id et l'élément à afficher
     */
    this.state = {
      siteId: this.props.match.params.siteId || false,
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
    if (prevProps.match.params.siteId && this.props.match.params.siteId) {
      if (prevProps.match.params.siteId !== this.props.match.params.siteId) {
        this.setState({siteId: this.props.match.params.siteId})
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
    this.props.history.push('/site');
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
        cogoToast.success("Enregistrement effectué");
        this.props.actions.propagateModel('FreeAsso_Site', result);
        this.props.history.push('/site');
      })
      .catch(errors => {
        // @todo display errors to fields
        cogoToast.error("Erreur lors de l'enregistrement");
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="site-modify global-card">
        {this.props.site.loadOnePending ? (
          <Loading9x9 />
        ) : (
          <div>
            {item && 
              <Form 
                item={item} 
                datas={this.props.data.items}
                config={this.props.config.items}
                site_types={this.props.siteType.items} 
                properties={this.props.site.properties}
                tab={this.props.site.tab}
                tabs={this.props.site.tabs}
                onSubmit={this.onSubmit} 
                onCancel={this.onCancel} 
              />
            }
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
