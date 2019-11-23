import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from '../../common';
import Form from './Form';

export class Create extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      siteId: 0,
      item: false,
    };
    /**
     * Bind des méthodes locales au contexte courant
     */
    this.onChange = this.onChange.bind(this);
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
      console.log(item);
      this.setState({ item: item });
    });
  }

  /**
   * Sur changement
   */
  onChange(event) {
    if (event) {
      event.preventDefault();
    }
    if (event && event.target) {
      const value = event.target.value;
      let item = this.state.item;
      item[event.target.name] = value;
      this.setState({ item: item });
    }
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/site');
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   * Sur erreur faut afficher les messages d'anomalie
   */
  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    let error = false;
    if (!error) {
      // Conversion des données en objet pour le service web
      let obj = getJsonApi(this.state.item, 'FreeAsso_Site', this.state.siteId);
      console.log(obj);
      return true;
      this.props.actions.createOne(obj)
        .then(result => {
          this.props.actions.reload();
          this.props.history.push('/site');
        })
        .catch(errors => {
          // @todo display errors to fields
          console.log(errors);
        })
      ;
    }
  }

  render() {
    const item = this.state.item;
    return (
      <div className="site-type-create">
        {item && (
          <Form
            item={item}
            site_types={this.props.siteType.items}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    site: state.site,
    siteType: state.siteType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create));
