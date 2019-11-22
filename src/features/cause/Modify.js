import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {
  withRouter
} from 'react-router-dom';
import { getJsonApi, propagateModel } from '../../common';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    /**
     * On récupère l'id et l'élément à afficher
     */
    this.state = {
      causeId: this.props.match.params.causeId || false,
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
    this.props.actions.loadOne(this.state.causeId).then(result => {
      const item = this.props.cause.loadOneItem;
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
    this.props.history.push('/cause')
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
      let obj = getJsonApi(this.state.item, 'FreeAsso_Cause', this.state.causeId);
      this.props.actions.updateOne(this.state.causeId, obj)
        .then(result => {
          // @Todo propagate result to store
          // propagateModel est ajouté aux actions en bas de document
          this.props.actions.propagateModel('FreeAsso_Cause', result);
          this.props.history.push('/cause')
        })
        .catch((errors) => {
          // @todo display errors to fields
          console.log(errors);
        })
      ;
    }
  }  

  render() {
    const item = this.state.item;
    console.log("FK modif cause",this.props);
    return (      
      <div className="cause-modify">
        {item && (
          <Form 
            item={this.props.cause.loadOneItem}
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
    cause: state.cause,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps, 
  mapDispatchToProps
)(Modify));
