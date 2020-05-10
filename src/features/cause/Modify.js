import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading3Dots, modifySuccess, modifyError } from '../ui';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
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
      causeId: this.props.cauId || this.props.match.params.causeId || false,
      modal: this.props.modal || false,
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.causeId && this.props.match.params.causeId) {
      if (prevProps.match.params.causeId !== this.props.match.params.causeId) {
        this.setState({causeId: this.props.match.params.causeId})
        this.props.actions.loadOne(this.props.match.params.causeId).then(result => {
          const item = this.props.cause.loadOneItem;
          this.setState({ item: item });
        });
      }
    }
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel(event) {
    if (event) {
      event.preventDefault();
    }
    if (!this.state.modal) {
      this.props.history.push('/cause');
    } else {
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeAsso_Cause', this.state.causeId);
    this.props.actions
      .updateOne(this.state.causeId, obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_Cause', result);
        if (!this.state.modal) {
          this.props.history.push('/cause');
        } else {
          if (this.props.onClose) {
            this.props.onClose();
          }
        }
      })
      .catch(errors => {
        modifyError();
      });
  }

  render() {
    const item = this.state.item;
    const prev = '/cause/modify/' + this.props.cause.loadItemPrev;
    const next = '/cause/modify/' + this.props.cause.loadItemNext;
    return (
      <div className="cause-modify global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            <Form
              item={item}
              prev={prev}
              next={next}
              modify
              modal={this.state.modal}
              cause_types={this.props.causeType.items}
              cause_main_types={this.props.causeMainType.items}
              tab_datas={this.props.data.items}
              tab_configs={this.props.config.items}
              tab={this.props.cause.tab}
              tabs={this.props.cause.tabs}
              errors={this.props.cause.updateOneError}
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
    data: state.data,
    config: state.config,
    cause: state.cause,
    causeType: state.causeType,
    causeMainType: state.causeMainType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify));
