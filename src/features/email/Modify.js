import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { propagateModel, modelsToSelect } from '../../common';
import { CenteredLoading9X9 } from '../ui';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    email: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id || false,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.id).then(result => {
      const item = this.props.email.loadOneItem;
      console.log(item);
      this.setState({ item: item });
    });
  }

  onCancel(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/email');
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeFW_Email', this.state.id);
    this.props.actions
      .updateOne(obj)
      .then(result => {
        // @Todo propagate result to store
        // propagateModel est ajouté aux actions en bas de document
        this.props.actions.propagateModel('FreeFW_Email', result);
        this.props.history.push('/email');
      })
      .catch(errors => {
        // @todo display errors to fields
        console.log(errors);
      });
  }

  render() {
    const item = this.state.item;
    const options = modelsToSelect(this.props.lang.items, 'id', 'lang_name');
    return (
      <div className="email-modify global-card">
        {this.props.email.loadOnePending ? (
          <CenteredLoading9X9 />
        ) : (
          <div>
            {item && <Form item={item} onSubmit={this.onSubmit} onCancel={this.onCancel} langs={options} />}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.email,
    lang: state.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify));
