import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { CenteredLoading9X9, createSuccess, createError } from '../ui';
import Form from './Form';

export class Create extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      causeId: 0,
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
    this.props.actions.loadOne(this.state.causeId).then(result => {
      const item = this.props.cause.loadOneItem;
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
    this.props.history.push('/cause')
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   * Sur erreur faut afficher les messages d'anomalie
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeAsso_Cause', this.state.causeId);
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess()
        this.props.actions.clearItems();
        this.props.history.push('/cause');
      })
      .catch(errors => {
        // @todo display errors to fields
        createError();
        console.log(errors);
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="cause-create global-card">
        {this.props.cause.loadOnePending ? (
          <CenteredLoading9X9 />
        ) : (
          <div>
            {item && 
              <Form 
                item={item} 
                cause_types={this.props.causeType.items} 
                cause_main_types={this.props.causeMainType.items}
                tab_datas={this.props.data.items}
                tab_configs={this.props.config.items}
                tab={this.props.cause.tab}
                tabs={this.props.cause.tabs}
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
    data: state.data,
    config: state.config,
    cause: state.cause,
    causeType: state.causeType,
    causeMainType : state.causeMainType,
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
