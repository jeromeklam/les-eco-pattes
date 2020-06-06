import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { getCauses } from '../cause';
import { CenteredLoading9X9, createSuccess, createError } from '../ui';
import Form from './Form';

export class Create extends Component {
  static propTypes = {
    movement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
    selected: PropTypes.element,
  };
  static defaultProps = {
    loader: true,
    selected: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      movementId: 0,
      item: false,
      modal: this.props.modal || false,
      loading: true,
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
    this.setState({ loading: true });
    this.props.actions.loadOne(this.state.movementId).then(result => {
      const item = this.props.movement.loadOneItem;
      if (Array.isArray(this.props.selected) && this.props.selected.length > 0) {
        getCauses('list', null, null, this.props.selected).then(result => {
          item.causes = result;
          this.setState({ item: item, loading: false });
        });
      } else {
        this.setState({ item: item, loading: false });
      }
    });
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel(event) {
    if (event) {
      event.preventDefault();
    }
    if (!this.props.modal) {
      this.props.history.push('/movement');
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
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeAsso_Movement', this.state.movementId);
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.clearItems();
        if (!this.props.modal) {
          this.props.history.push('/movement');
        } else {
          if (this.props.onClose) {
            this.props.onClose();
          }
        }
      })
      .catch(errors => {
        createError();
      });
  }

  render() {
    let item = this.state.item;
    return (
      <div className="movement-modify global-card">
        {this.props.loading ? (
          <CenteredLoading9X9 show={this.props.loading} />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                modal={this.state.modal}
                mode={this.props.mode}
                fromSite={this.props.site}
                datas={this.props.data.items}
                config={this.props.config.items}
                errors={this.props.movement.createOneError}
                tab={this.props.movement.tab}
                tabs={this.props.movement.tabs}
                cause_types={this.props.causeType.items}
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
    movement: state.movement,
    data: state.data,
    config: state.config,
    causeType: state.causeType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create));
