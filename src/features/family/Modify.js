import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading9X9, modifySuccess, modifyError } from '../ui';

/**
 * Modification d'une maladie
 */
export class Modify extends Component {
  static propTypes = {
    family: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      famId: this.props.famId || this.props.match.params.famId || false,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.famId).then(result => {
      const item = this.props.family.loadOneItem;
      this.setState({ item: item });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.famId !== this.props.match.params.famId) {
      this.setState({ famId: this.props.match.params.famId });
      this.props.actions.loadOne(this.props.match.params.famId).then(result => {
        const item = this.props.family.loadOneItem;
        this.setState({ item: item });
      });
    }
  }

  /**
   * Sur annulation, on retourne à la liste
   */
  onCancel() {
    this.props.onClose();
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
        this.props.actions.propagateModel('FreeAsso_Family', result);
        this.props.onClose();
      })
      .catch(errors => {
        // @todo display errors to fields
        modifyError();
      });
  }

  render() {
    const { item } = this.state;
    return (
      <div className="family-modify global-card">
        {this.props.family.loadOnePending ? (
          <CenteredLoading9X9 />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                datas={this.props.data.items}
                config={this.props.config.items}
                properties={this.props.family.properties}
                errors={this.props.family.updateOneError}
                tab={this.props.family.tab}
                tabs={this.props.family.tabs}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
                onClose={this.props.onClose}
                modal
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
    family: state.family,
    data: state.data,
    config: state.config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify));
