import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading9X9, modifySuccess, modifyError } from '../ui';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    causeType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      causeTypeId: this.props.match.params.id || false,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.causeTypeId).then(result => {
      const item = this.props.causeType.loadOneItem;
      this.setState({ item: item });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.cautId && this.props.match.params.cautId) {
      if (prevProps.match.params.cautId !== this.props.match.params.cautId) {
        this.setState({ cautId: this.props.match.params.cautId });
        this.props.actions.loadOne(this.props.match.params.cautId).then(result => {
          const item = this.props.causeType.loadOneItem;
          this.setState({ item: item });
        });
      }
    }
  }

  onCancel() {
    this.props.history.push('/cause-type');
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   */
  onSubmit(datas) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas);
    this.props.actions
      .updateOne(obj)
      .then(result => {
        modifySuccess();
        // propagateModel est ajouté aux actions en bas de document
        this.props.actions.propagateModel('FreeAsso_CauseType', result);
        this.props.history.push('/cause-type');
      })
      .catch(errors => {
        modifyError();
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="cause-type-modify global-card">
        {this.props.causeType.loadOnePending ? (
          <CenteredLoading9X9 />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                datas={this.props.data.items}
                config={this.props.config.items}
                causeMainTypes={this.props.causeMainType.items}
                properties={this.props.causeType.properties}
                errors={this.props.causeType.updateOneError}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
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
    causeType: state.causeType,
    data: state.data,
    config: state.config,
    causeMainType: state.causeMainType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify));
